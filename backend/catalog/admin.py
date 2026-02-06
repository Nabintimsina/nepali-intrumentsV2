from django.contrib import admin
from .models import Category, Instrument, Media, Expert, LearningContent, Contact


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}


class MediaInline(admin.TabularInline):
    model = Media
    extra = 1


@admin.register(Instrument)
class InstrumentAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'region', 'is_featured', 'created_at')
    list_filter = ('category', 'region', 'is_featured')
    search_fields = ('name', 'description', 'history')
    inlines = [MediaInline]


@admin.register(Expert)
class ExpertAdmin(admin.ModelAdmin):
    list_display = ('name', 'expertise', 'contact_email', 'created_at')
    search_fields = ('name', 'expertise', 'bio')
    filter_horizontal = ('instruments',)


@admin.register(LearningContent)
class LearningContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_published', 'updated_at')
    list_filter = ('is_published',)
    search_fields = ('title', 'content')


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('instrument', 'media_type', 'title', 'is_primary', 'uploaded_at')
    list_filter = ('media_type', 'is_primary')
    search_fields = ('instrument__name', 'title')


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at',)
    actions = ['mark_as_read', 'mark_as_unread']

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
        self.message_user(request, 'Selected messages marked as read.')
    mark_as_read.short_description = 'Mark selected as read'

    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
        self.message_user(request, 'Selected messages marked as unread.')
    mark_as_unread.short_description = 'Mark selected as unread'
