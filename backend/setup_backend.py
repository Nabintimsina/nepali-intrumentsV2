#!/usr/bin/env python
"""
Initialize Django backend with sample data.
Run this after migrations with: python setup_backend.py
"""
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nepali_platform.settings')
django.setup()

from catalog.models import Category, Instrument, Media, Expert, LearningContent

def create_sample_data():
    print("Creating sample data...")

    # Categories
    cat_string, _ = Category.objects.get_or_create(
        slug='string',
        defaults={'name': 'String', 'description': 'String instruments'}
    )
    cat_wind, _ = Category.objects.get_or_create(
        slug='wind',
        defaults={'name': 'Wind', 'description': 'Wind and breath instruments'}
    )
    cat_percussion, _ = Category.objects.get_or_create(
        slug='percussion',
        defaults={'name': 'Percussion', 'description': 'Percussion instruments'}
    )

    # Instruments
    instruments_data = [
        {
            'name': 'Madal',
            'category': cat_percussion,
            'region': 'Central Nepal',
            'description': 'The Madal is a traditional hand drum that plays a central role in Nepali folk music.',
            'history': 'Dating back centuries, the Madal has been an integral part of Nepali cultural ceremonies.',
            'materials': 'Traditionally crafted from hollowed wood with goat or sheep skin.',
            'playing_technique': 'Played horizontally across the lap, the right hand strikes the treble head.',
            'cultural_significance': 'Essential in folk music, religious ceremonies, and festivals.',
        },
        {
            'name': 'Sarangi',
            'category': cat_string,
            'region': 'Western Nepal',
            'description': 'The Sarangi is a traditional bowed string instrument carved from a single piece of wood.',
            'history': 'The Sarangi tradition has been passed down through Gandharva musicians for centuries.',
            'materials': 'Carved from a single piece of wood with four main strings and numerous sympathetic strings.',
            'playing_technique': 'Played by pressing fingernails against the strings from the side.',
            'cultural_significance': 'Central to the Gaine community\'s musical tradition.',
            'is_featured': True,
        },
        {
            'name': 'Bansuri',
            'category': cat_wind,
            'region': 'Throughout Nepal',
            'description': 'The Bansuri is a transverse bamboo flute that produces melodious tones.',
            'history': 'Mentioned in ancient texts and depicted in historical art.',
            'materials': 'Made from a single hollow bamboo shaft with six or seven holes.',
            'playing_technique': 'Held horizontally to the side, air is blown across the embouchure hole.',
            'cultural_significance': 'Associated with Lord Krishna in Hindu mythology.',
            'is_featured': True,
        },
    ]

    for data in instruments_data:
        Instrument.objects.get_or_create(
            name=data['name'],
            defaults={k: v for k, v in data.items() if k != 'name'}
        )

    # Experts
    expert_data = [
        {
            'name': 'Jhalak Gandharva',
            'expertise': 'Sarangi Master',
            'bio': 'Renowned Sarangi virtuoso from the Gaine community with over 30 years of experience.',
            'detailed_bio': 'Born into a family of traditional musicians, Jhalak began learning the Sarangi at age 7.',
            'contact_email': 'jhalak@nepalimusic.org',
            'achievements': ['National Music Award 2015', 'Cultural Heritage Ambassador 2018'],
        },
        {
            'name': 'Sunita Tamang',
            'expertise': 'Damphu Specialist',
            'bio': 'Celebrated Damphu player and cultural activist.',
            'detailed_bio': 'Growing up in a Tamang village, Sunita challenged traditional gender roles.',
            'contact_email': 'sunita.tamang@himalayansounds.org',
            'achievements': ['Women in Arts Award 2017', 'Tamang Cultural Excellence Award 2019'],
        },
    ]

    for data in expert_data:
        Expert.objects.get_or_create(
            name=data['name'],
            defaults={k: v for k, v in data.items() if k != 'name'}
        )

    # Learning Content
    learning_data = [
        {
            'title': 'Introduction to Nepali Music',
            'content': 'Nepali music is a rich tapestry woven from diverse ethnic traditions, geographical influences, and centuries of cultural exchange.',
            'order': 1,
        },
        {
            'title': 'Instrument Classification',
            'content': 'Traditional Nepali instruments are classified into four main categories based on how sound is produced.',
            'order': 2,
        },
    ]

    for data in learning_data:
        LearningContent.objects.get_or_create(
            title=data['title'],
            defaults={k: v for k, v in data.items() if k != 'title'}
        )

    print("✓ Sample data created successfully!")


if __name__ == '__main__':
    try:
        create_sample_data()
    except Exception as e:
        print(f"✗ Error: {e}")
        sys.exit(1)
