// Sample instruments data
export const instrumentsData = [
  {
    id: 1,
    name: 'Madal',
    category: 'Percussion',
    region: 'Central Nepal',
    image: '/images/instruments/madal.jpg',
    description: 'The Madal is a traditional hand drum that plays a central role in Nepali folk music. This double-headed drum is played with both hands and produces distinct high and low tones.',
    history: 'Dating back centuries, the Madal has been an integral part of Nepali cultural ceremonies, festivals, and daily life. It is particularly associated with the Magar and Gurung communities.',
    materials: 'Traditionally crafted from hollowed wood with goat or sheep skin stretched over both ends, secured with leather straps.',
    playingTechnique: 'Played horizontally across the lap, the right hand strikes the treble head while the left hand plays the bass head. Various hand positions create different tones.',
    culturalSignificance: 'Essential in folk music, religious ceremonies, and festivals. Often accompanies traditional dances and songs.',
    sound: '/audio/madal-sample.mp3',
    model3D: '/models/madal.glb'
  },
  {
    id: 2,
    name: 'Sarangi',
    category: 'String',
    region: 'Western Nepal',
    image: '/images/instruments/sarangi.jpg',
    description: 'The Sarangi is a traditional bowed string instrument carved from a single piece of wood. It produces haunting, soulful melodies that have captivated audiences for generations.',
    history: 'The Sarangi tradition has been passed down through Gandharva musicians for centuries, serving as the primary accompaniment to folk narratives and spiritual songs.',
    materials: 'Carved from a single piece of wood (usually khirro), with four main strings and numerous sympathetic strings. The bow is made from horsehair.',
    playingTechnique: 'Played by pressing fingernails against the strings from the side while bowing with the other hand. Requires years of practice to master.',
    culturalSignificance: 'Central to the Gaine community\'s musical tradition. Used in storytelling, spiritual songs, and classical performances.',
    sound: '/audio/sarangi-sample.mp3',
    model3D: '/models/sarangi.glb'
  },
  {
    id: 3,
    name: 'Bansuri',
    category: 'Wind',
    region: 'Throughout Nepal',
    image: '/images/instruments/bansuri.jpg',
    description: 'The Bansuri is a transverse bamboo flute that produces melodious tones. It is one of the oldest instruments in Nepal and holds spiritual significance.',
    history: 'Mentioned in ancient texts and depicted in historical art, the Bansuri has been used in meditation, religious ceremonies, and entertainment for thousands of years.',
    materials: 'Made from a single hollow bamboo shaft with six or seven holes. The quality of bamboo determines the instrument\'s tone.',
    playingTechnique: 'Held horizontally to the side, air is blown across the embouchure hole while fingers cover and uncover the tone holes to create different notes.',
    culturalSignificance: 'Associated with Lord Krishna in Hindu mythology. Used in classical music, meditation, and folk traditions.',
    sound: '/audio/bansuri-sample.mp3',
    model3D: '/models/bansuri.glb'
  },
  {
    id: 4,
    name: 'Damphu',
    category: 'Percussion',
    region: 'Eastern Nepal',
    image: '/images/instruments/damphu.jpg',
    description: 'The Damphu is a large circular frame drum played primarily in the Tamang and Sherpa communities. Its deep, resonant sound is central to community gatherings.',
    history: 'Integral to Tamang Selo music, the Damphu has been used for centuries in celebrations, rituals, and cultural events in mountain communities.',
    materials: 'A circular wooden frame covered with animal hide. Often decorated with colorful paintings and symbols.',
    playingTechnique: 'Held in one hand and struck with the other, or placed on the ground and played with both hands. Different striking techniques produce varied tones.',
    culturalSignificance: 'Essential in Tamang cultural identity, used in weddings, New Year celebrations, and community dances.',
    sound: '/audio/damphu-sample.mp3',
    model3D: '/models/damphu.glb'
  },
  {
    id: 5,
    name: 'Arbajo',
    category: 'String',
    region: 'Far Western Nepal',
    image: '/images/instruments/arbajo.jpg',
    description: 'The Arbajo is a plucked string instrument with a distinctive sound. It features a long neck and four strings, commonly used in folk songs.',
    history: 'Developed in the western hills of Nepal, the Arbajo has been a companion to travelers and shepherds, accompanying folk tales and songs.',
    materials: 'Crafted with a wooden body, a long neck, and four strings made from animal gut or modern materials.',
    playingTechnique: 'Held vertically and played by plucking the strings with fingers or a plectrum.',
    culturalSignificance: 'Popular in Deuda songs and rural folk music traditions of Far Western Nepal.',
    sound: '/audio/arbajo-sample.mp3',
    model3D: '/models/arbajo.glb'
  },
  {
    id: 6,
    name: 'Panche Baja',
    category: 'Wind',
    region: 'Throughout Nepal',
    image: '/images/instruments/panche-baja.jpg',
    description: 'Panche Baja is actually an ensemble of five traditional instruments played together, commonly heard at weddings and festivals.',
    history: 'This ensemble tradition dates back centuries and is considered auspicious for celebrations and ceremonies.',
    materials: 'Consists of Jhyali (cymbals), Tyamko (small drum), Dholak (drum), Damaha (large drum), and Narsingha (horn).',
    playingTechnique: 'Requires a group of musicians, each playing their specific instrument in coordination.',
    culturalSignificance: 'Indispensable at weddings, festivals, and religious processions throughout Nepal.',
    sound: '/audio/panche-baja-sample.mp3',
    model3D: '/models/panche-baja.glb'
  }
]

// Sample experts/artists data
export const expertsData = [
  {
    id: 1,
    name: 'Jhalak Gandharva',
    expertise: 'Sarangi Master',
    instruments: ['Sarangi', 'Madal'],
    photo: '/images/experts/expert1.jpg',
    bio: 'Jhalak Gandharva is a renowned Sarangi virtuoso from the Gaine community with over 30 years of experience. He has performed internationally and is dedicated to preserving traditional Nepali music.',
    detailedBio: 'Born into a family of traditional musicians, Jhalak began learning the Sarangi at age 7. He has performed at numerous national and international venues, representing Nepali musical heritage. He currently teaches at the Nepal Music Academy and runs workshops for young musicians.',
    achievements: [
      'National Music Award, 2015',
      'Cultural Heritage Ambassador, 2018',
      'Featured in UNESCO Cultural Preservation Program'
    ],
    contact: 'jhalak@nepalimusic.org',
    linkedInstruments: [2, 1],
    performanceVideo: '/videos/jhalak-performance.mp4',
    teachingAudio: '/audio/jhalak-teaching.mp3'
  },
  {
    id: 2,
    name: 'Sunita Tamang',
    expertise: 'Damphu Specialist',
    instruments: ['Damphu', 'Madal'],
    photo: '/images/experts/expert2.jpg',
    bio: 'Sunita Tamang is a celebrated Damphu player and cultural activist who has pioneered the inclusion of women in traditional Tamang music. She leads cultural preservation workshops across mountain communities.',
    detailedBio: 'Growing up in a Tamang village, Sunita challenged traditional gender roles to become one of the first female Damphu masters. She has trained hundreds of students and works tirelessly to document and preserve Tamang musical traditions.',
    achievements: [
      'Women in Arts Award, 2017',
      'Tamang Cultural Excellence Award, 2019',
      'Founded Himalayan Women Musicians Collective'
    ],
    contact: 'sunita.tamang@himalayansounds.org',
    linkedInstruments: [4, 1],
    performanceVideo: '/videos/sunita-performance.mp4',
    teachingAudio: '/audio/sunita-teaching.mp3'
  },
  {
    id: 3,
    name: 'Raj Kumar Shrestha',
    expertise: 'Bansuri Maestro',
    instruments: ['Bansuri', 'Murali'],
    photo: '/images/experts/expert3.jpg',
    bio: 'Raj Kumar Shrestha is a classically trained Bansuri player who blends traditional and contemporary styles. He has composed music for films and documentaries about Nepali culture.',
    detailedBio: 'Trained in both Nepali folk music and classical Indian traditions, Raj Kumar has developed a unique style that bridges traditional and modern audiences. He regularly performs meditation music and has released several albums.',
    achievements: [
      'Best Instrumental Music, National Film Awards 2016',
      'Sangeet Shiromani Award, 2020',
      'Published "The Art of Bansuri Playing"'
    ],
    contact: 'raj.bansuri@gmail.com',
    linkedInstruments: [3],
    performanceVideo: '/videos/raj-performance.mp4',
    teachingAudio: '/audio/raj-teaching.mp3'
  },
  {
    id: 4,
    name: 'Hira Devi Waiba',
    expertise: 'Folk Music Scholar',
    instruments: ['Madal', 'Damphu', 'Arbajo'],
    photo: '/images/experts/expert4.jpg',
    bio: 'Dr. Hira Devi Waiba is an ethnomusicologist and multi-instrumentalist who has documented traditional music from over 50 ethnic communities across Nepal.',
    detailedBio: 'With a PhD in Ethnomusicology, Dr. Waiba has spent decades traveling to remote areas of Nepal, recording and preserving traditional songs and instrumental techniques. Her research has been crucial in safeguarding endangered musical traditions.',
    achievements: [
      'Nepal Vidya Bhusan (National Honor), 2018',
      'Published 15+ research papers on Nepali folk music',
      'Established Folk Music Archive at Tribhuvan University'
    ],
    contact: 'hira.devi@tu.edu.np',
    linkedInstruments: [1, 4, 5],
    performanceVideo: '/videos/hira-lecture.mp4',
    teachingAudio: '/audio/hira-teaching.mp3'
  }
]

// Learning content data
export const learningTopics = [
  {
    id: 1,
    title: 'Introduction to Nepali Music',
    content: `Nepali music is a rich tapestry woven from diverse ethnic traditions, geographical influences, and centuries of cultural exchange. From the mountains to the plains, each region has developed unique musical styles, instruments, and performance practices.

Traditional Nepali music can be broadly categorized into classical, folk, and devotional genres. Classical music shows influences from Indian classical traditions, while folk music varies dramatically across different ethnic communities. Religious music includes Buddhist chants, Hindu bhajans, and various ritual music forms.`
  },
  {
    id: 2,
    title: 'Instrument Classification',
    content: `Traditional Nepali instruments are classified into four main categories based on how sound is produced:

**Tata Vadya (String Instruments):**
- Plucked: Sarangi, Arbajo, Tungna
- Bowed: Sarangi (can be played both ways)

**Sushira Vadya (Wind Instruments):**
- Flutes: Bansuri, Murali, Basuri
- Horns: Narsingha, Sankha
- Reed instruments: Been, Muhali

**Avanaddha Vadya (Percussion - Membrane):**
- Hand drums: Madal, Damphu, Dhime
- Stick drums: Dhol, Tyamko

**Ghana Vadya (Percussion - Solid):**
- Cymbals: Jhyali, Bhushya
- Bells: Ghanti, Tingsha
- Gongs: Various types`
  },
  {
    id: 3,
    title: 'Playing Techniques',
    content: `Each instrument family requires specific techniques and years of practice to master:

**String Instruments:**
- Finger positioning and pressure control are crucial
- Bowing technique for instruments like Sarangi requires specific wrist movements
- Plucking patterns vary between instruments and musical styles

**Wind Instruments:**
- Breath control is fundamental
- Embouchure (mouth position) determines tone quality
- Finger hole coverage must be precise for accurate pitch

**Percussion:**
- Hand positioning affects tone quality
- Different striking points produce different sounds
- Rhythm patterns are often complex and require coordination

**Practice Tips:**
- Start with basic exercises daily
- Learn from experienced teachers when possible
- Regular practice is more important than long sessions
- Understanding the cultural context enhances learning`
  },
  {
    id: 4,
    title: 'Maintenance and Care',
    content: `Proper maintenance ensures longevity and sound quality of traditional instruments:

**General Care:**
- Store instruments in dry, moderate temperature environments
- Avoid direct sunlight and extreme humidity
- Keep instruments in protective cases when not in use

**String Instruments:**
- Check and replace strings regularly
- Oil wooden parts to prevent cracking
- Tune before each practice session
- Clean after use to remove rosin buildup (for bowed instruments)

**Wind Instruments (Bamboo):**
- Clean interior with soft cloth after use
- Apply natural oil occasionally to prevent drying
- Store in cloth bags for protection
- Avoid exposure to excessive moisture

**Percussion Instruments:**
- Keep drum heads clean and dry
- Tighten or loosen tension as needed for optimal sound
- Repair or replace worn drum heads
- Clean cymbals with appropriate metal cleaners

**Professional Maintenance:**
- Have instruments checked by experts annually
- Learn basic repairs from experienced craftsmen
- Source replacement parts from traditional makers when possible`
  },
  {
    id: 5,
    title: 'Cultural Context and Etiquette',
    content: `Understanding the cultural significance of instruments enriches the learning experience:

**Respect for Tradition:**
- Many instruments have religious or spiritual significance
- Traditional playing settings often have specific protocols
- Learning from a guru (teacher) is traditionally valued

**Performance Contexts:**
- Ceremonial music has specific requirements and purposes
- Folk music is often communal and participatory
- Understanding when and where instruments are played is important

**Ethical Considerations:**
- Respect intellectual property of traditional music
- Support traditional craftsmen when purchasing instruments
- Honor the communities from which these traditions originate
- Share knowledge responsibly and with proper attribution

**Learning Path:**
- Begin with understanding cultural context
- Learn basic techniques before attempting complex pieces
- Participate in community music events when possible
- Document your learning journey respectfully`
  }
]
