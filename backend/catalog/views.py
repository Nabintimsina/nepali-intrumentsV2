from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Instrument, Media, Expert, LearningContent, Contact
from .serializers import (
    CategorySerializer,
    InstrumentListSerializer,
    InstrumentDetailSerializer,
    MediaSerializer,
    ExpertListSerializer,
    ExpertDetailSerializer,
    LearningContentSerializer,
    ContactSerializer,
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
