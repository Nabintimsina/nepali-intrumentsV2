from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name


class Instrument(models.Model):
    name = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='instruments')
    region = models.CharField(max_length=120)
    description = models.TextField()
    history = models.TextField(blank=True)
    materials = models.TextField(blank=True)
    playing_technique = models.TextField(blank=True)
    cultural_significance = models.TextField(blank=True)
    primary_image = models.ImageField(upload_to='instruments/images/', blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name


class Media(models.Model):
    IMAGE = 'image'
    AUDIO = 'audio'
    MODEL_3D = 'model_3d'
    VIDEO = 'video'

    MEDIA_TYPE_CHOICES = [
        (IMAGE, 'Image'),
        (AUDIO, 'Audio'),
        (MODEL_3D, '3D Model'),
        (VIDEO, 'Video'),
    ]

    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE, related_name='media')
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPE_CHOICES)
    file = models.FileField(upload_to='instruments/media/')
    title = models.CharField(max_length=150, blank=True)
    is_primary = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['media_type', 'id']

    def __str__(self) -> str:
        return f'{self.instrument.name} - {self.media_type}'


class Expert(models.Model):
    name = models.CharField(max_length=150)
    expertise = models.CharField(max_length=150)
    bio = models.TextField()
    detailed_bio = models.TextField(blank=True)
    contact_email = models.EmailField(blank=True)
    photo = models.ImageField(upload_to='experts/photos/', blank=True, null=True)
    achievements = models.JSONField(default=list, blank=True)
    instruments = models.ManyToManyField(Instrument, related_name='experts', blank=True)
    performance_video = models.FileField(upload_to='experts/videos/', blank=True, null=True)
    teaching_audio = models.FileField(upload_to='experts/audio/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name


class LearningContent(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self) -> str:
        return self.title


class Contact(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f"{self.subject} - {self.name}"


class Tutorial(models.Model):
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE, related_name='tutorials')
    title = models.CharField(max_length=200)
    description = models.TextField()
    video_url = models.URLField()
    instructor_name = models.CharField(max_length=150)
    duration = models.CharField(max_length=50, blank=True, help_text="e.g., '12:30'")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f"{self.title} - {self.instructor_name}"


class TunerConfiguration(models.Model):
    instrument = models.OneToOneField(Instrument, on_delete=models.CASCADE, related_name='tuner_config')
    tuning_name = models.CharField(max_length=100, default='Standard')
    notes = models.JSONField(default=list, help_text='List of note names, e.g. ["E2", "A2", "D3", "G3", "B3", "E4"]')
    frequencies = models.JSONField(default=list, help_text="List of frequencies in Hz, e.g. [82.41, 110.00, 146.83, 196.00, 246.94, 329.63]")
    is_default = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_default', 'tuning_name']

    def __str__(self) -> str:
        return f"{self.instrument.name} - {self.tuning_name}"
