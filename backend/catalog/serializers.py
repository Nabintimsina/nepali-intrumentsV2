from rest_framework import serializers
from .models import Category, Instrument, Media, Expert, LearningContent


def get_media_url(media_obj: Media | None) -> str | None:
    if not media_obj:
        return None
    return media_obj.file.url if media_obj.file else None


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'media_type', 'file', 'title', 'is_primary']


class InstrumentListSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    image = serializers.ImageField(source='primary_image', allow_null=True, required=False)

    class Meta:
        model = Instrument
        fields = [
            'id',
            'name',
            'category',
            'region',
            'image',
            'description',
            'is_featured',
        ]


class ExpertPreviewSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(allow_null=True, required=False)

    class Meta:
        model = Expert
        fields = ['id', 'name', 'expertise', 'photo']


class InstrumentDetailSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    image = serializers.ImageField(source='primary_image', allow_null=True, required=False)
    media = MediaSerializer(many=True, read_only=True)
    audio_sample = serializers.SerializerMethodField()
    model_3d = serializers.SerializerMethodField()
    experts = ExpertPreviewSerializer(many=True, read_only=True)

    class Meta:
        model = Instrument
        fields = [
            'id',
            'name',
            'category',
            'region',
            'image',
            'description',
            'history',
            'materials',
            'playing_technique',
            'cultural_significance',
            'audio_sample',
            'model_3d',
            'media',
            'experts',
        ]

    def get_audio_sample(self, obj: Instrument) -> str | None:
        audio = obj.media.filter(media_type=Media.AUDIO).order_by('-is_primary', 'id').first()
        return get_media_url(audio)

    def get_model_3d(self, obj: Instrument) -> str | None:
        model = obj.media.filter(media_type=Media.MODEL_3D).order_by('-is_primary', 'id').first()
        return get_media_url(model)


class ExpertListSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(allow_null=True, required=False)
    instruments = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

    class Meta:
        model = Expert
        fields = ['id', 'name', 'expertise', 'photo', 'bio', 'instruments']


class InstrumentMiniSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    image = serializers.ImageField(source='primary_image', allow_null=True, required=False)

    class Meta:
        model = Instrument
        fields = ['id', 'name', 'category', 'region', 'image']


class ExpertDetailSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(allow_null=True, required=False)
    instruments = InstrumentMiniSerializer(many=True, read_only=True)

    class Meta:
        model = Expert
        fields = [
            'id',
            'name',
            'expertise',
            'photo',
            'bio',
            'detailed_bio',
            'achievements',
            'contact_email',
            'performance_video',
            'teaching_audio',
            'instruments',
        ]


class LearningContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningContent
        fields = ['id', 'title', 'content', 'order']
