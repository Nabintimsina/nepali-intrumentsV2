from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Instrument, Media, Expert, LearningContent, Contact, Tutorial, TunerConfiguration
from .serializers import (
    CategorySerializer,
    InstrumentListSerializer,
    InstrumentDetailSerializer,
    MediaSerializer,
    ExpertListSerializer,
    ExpertDetailSerializer,
    LearningContentSerializer,
    ContactSerializer,
    TutorialSerializer,
    TunerConfigurationSerializer,
)
from .permissions import IsAdminOrReadOnly
from .filters import InstrumentFilter


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ['name', 'description']


class InstrumentViewSet(viewsets.ModelViewSet):
    queryset = Instrument.objects.select_related('category').prefetch_related('media', 'experts')
    permission_classes = [IsAdminOrReadOnly]
    filterset_class = InstrumentFilter
    search_fields = ['name', 'description', 'history', 'materials', 'cultural_significance']
    ordering_fields = ['name', 'region', 'created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return InstrumentDetailSerializer
        return InstrumentListSerializer
    
    @action(detail=True, methods=['get'], permission_classes=[AllowAny])
    def tutorials(self, request, pk=None):
        instrument = self.get_object()
        tutorials = instrument.tutorials.all()
        serializer = TutorialSerializer(tutorials, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'], permission_classes=[AllowAny])
    def tuner_config(self, request, pk=None):
        instrument = self.get_object()
        try:
            config = instrument.tuner_config
            serializer = TunerConfigurationSerializer(config)
            return Response(serializer.data)
        except TunerConfiguration.DoesNotExist:
            return Response(None)


class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.select_related('instrument')
    serializer_class = MediaSerializer
    permission_classes = [IsAdminOrReadOnly]


class ExpertViewSet(viewsets.ModelViewSet):
    queryset = Expert.objects.prefetch_related('instruments')
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ['name', 'expertise']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ExpertDetailSerializer
        return ExpertListSerializer


class LearningContentViewSet(viewsets.ModelViewSet):
    queryset = LearningContent.objects.all()
    serializer_class = LearningContentSerializer
    permission_classes = [AllowAny]
    ordering_fields = ['order', 'title']


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]
    ordering_fields = ['created_at']

    def get_permissions(self):
        # Allow anyone to create contact messages
        if self.action == 'create':
            return [AllowAny()]
        # Only admins can view, update, delete
        return [IsAdminOrReadOnly()]

    def perform_create(self, serializer):
        serializer.save()


class TutorialViewSet(viewsets.ModelViewSet):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ['title', 'instructor_name']
    ordering_fields = ['created_at', 'instructor_name']


class TunerConfigurationViewSet(viewsets.ModelViewSet):
    queryset = TunerConfiguration.objects.all()
    serializer_class = TunerConfigurationSerializer
    permission_classes = [IsAdminOrReadOnly]
    ordering_fields = ['tuning_name', 'is_default']
