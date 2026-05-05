import { Itinerary } from './types';

export const itineraryData: Itinerary = {
  title: "JAPONYA GEZİ REHBERİ",
  dates: "20 Mayıs - 1 Haziran 2026",
  cities: [
    {
      id: "osaka",
      name: "OSAKA",
      hotel: "Vessel Inn Namba",
      dates: "20 - 23 Mayıs",
      imageUrl: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&q=80&w=1600", 
      color: "#ef4444", 
      info: {
        weather: "24°C / 16°C",
        currency: "1 JPY ≈ 0.23 TL",
        transport: "ICOCA / Nankai",
        timezone: "+6 Saat"
      },
      days: [
        {
          date: "20 Mayıs",
          dayName: "Çarşamba",
          title: "Varış & İlk Keşif",
          activities: [
            { time: "12:40 - 14:00", description: "KIX Havalimanı Varış, Pasaport ve Bavul", category: "travel", mapQuery: "Kansai International Airport", coordinates: { lat: 34.434, lng: 135.244 } },
            { time: "14:00 - 15:00", description: "Şehre Transfer (Nankai Rapi:t treni ile Namba)", category: "travel", mapQuery: "Nankai Namba Station", coordinates: { lat: 34.664, lng: 135.502 } },
            { time: "15:00 - 15:45", description: "Otel Check-in ve Bavul Bırakma", category: "checkin", mapQuery: "Vessel Inn Namba", coordinates: { lat: 34.668, lng: 135.501 } },
            { time: "15:45 - 16:45", description: "Namba Yasaka Shrine (Aslan Tapınağı)", category: "sightseeing", mapQuery: "Namba Yasaka Jinja", coordinates: { lat: 34.661, lng: 135.496 } },
            { time: "16:45 - 18:00", description: "Mutfak Caddesi (Sennichimae Doguyasuji)", category: "shopping", mapQuery: "Sennichimae Doguyasuji Shopping Street", coordinates: { lat: 34.665, lng: 135.504 } },
            { time: "18:00 - 20:00", description: "Dotonbori Keşfi (Glico Adam, Sokak Lezzetleri)", category: "sightseeing", mapQuery: "Dotonbori", coordinates: { lat: 34.668, lng: 135.501 } },
            { time: "20:00 - 21:30", description: "Akşam Yemeği (Osaka Halal Wagyu Steak Yakiniku Furusato)", category: "food", mapQuery: "Osaka Halal Wagyu Steak Yakiniku Furusato", coordinates: { lat: 34.667, lng: 135.506 } },
            { time: "21:30 - 22:30", description: "Hozenji Yokocho (Yosunlu Heykele Su Dökme)", category: "sightseeing", mapQuery: "Hozenji Yokocho", coordinates: { lat: 34.668, lng: 135.502 } }
          ]
        },
        {
          date: "21 Mayıs",
          dayName: "Perşembe",
          title: "USJ & Doğum Günü",
          activities: [
            { time: "08:00 - 09:00", description: "USJ'ye Yolculuk (JR Hattı)", category: "travel", mapQuery: "Universal-City Station", coordinates: { lat: 34.6678, lng: 135.4385 } },
            { time: "09:00 - 18:30", description: "Universal Studios Japan (Nintendo World, Harry Potter vb.)", category: "leisure", mapQuery: "Universal Studios Japan", coordinates: { lat: 34.6654, lng: 135.4323 } },
            { time: "13:00 - 14:00", description: "USJ İçi Öğle Yemeği", category: "food", mapQuery: "Universal Studios Japan restaurants", coordinates: { lat: 34.6654, lng: 135.4323 } },
            { time: "18:30 - 20:00", description: "Universal CityWalk", category: "leisure", mapQuery: "Universal CityWalk Osaka", coordinates: { lat: 34.6680, lng: 135.4360 } },
            { time: "20:30 - 22:30", description: "Gizem'in Doğum Günü Yemeği (Namba/Shinsaibashi)", category: "food", mapQuery: "Shinsaibashi restaurants", coordinates: { lat: 34.6738, lng: 135.5019 } }
          ]
        },
        {
          date: "22 Mayıs",
          dayName: "Cuma",
          title: "Tasarım, Deniz & Lego",
          activities: [
            { time: "09:00 - 12:00", description: "Cup Noodles Museum (Ikeda)", category: "sightseeing", mapQuery: "Cup Noodles Museum Osaka Ikeda", coordinates: { lat: 34.8181, lng: 135.4273 } },
            { time: "12:00 - 13:00", description: "Tempozan Liman Bölgesine Geçiş", category: "travel", mapQuery: "Tempozan Harbor Village", coordinates: { lat: 34.6563, lng: 135.4308 } },
            { time: "13:00 - 15:00", description: "Kaiyukan Akvaryumu", category: "sightseeing", mapQuery: "Osaka Aquarium Kaiyukan", coordinates: { lat: 34.6545, lng: 135.4289 } },
            { time: "15:00 - 17:00", description: "Legoland Discovery (Rezervasyon Saati: 15:00)", category: "leisure", mapQuery: "LEGOLAND Discovery Center Osaka", coordinates: { lat: 34.6558, lng: 135.4312 } },
            { time: "17:00 - 18:00", description: "Tempozan Dönme Dolabı", category: "sightseeing", mapQuery: "Tempozan Ferris Wheel", coordinates: { lat: 34.6563, lng: 135.4311 } },
            { time: "18:00 - 19:30", description: "Pokemon Center DX (Shinsaibashi)", category: "shopping", mapQuery: "Pokemon Center Osaka DX", coordinates: { lat: 34.6738, lng: 135.5019 } },
            { time: "19:30 - 20:30", description: "HEP FIVE Dönme Dolabı (Umeda)", category: "sightseeing", mapQuery: "HEP FIVE Ferris Wheel", coordinates: { lat: 34.7042, lng: 135.4996 } },
            { time: "20:30 - 22:00", description: "Akşam Yemeği", category: "food", mapQuery: "Umeda restaurants", coordinates: { lat: 34.7020, lng: 135.5000 } }
          ]
        },
        {
          date: "23 Mayıs",
          dayName: "Cumartesi",
          title: "Tarih, Geyikler & Nostalji",
          activities: [
            { time: "09:00 - 11:30", description: "Osaka Kalesi (Road Train ve Kule)", category: "sightseeing", mapQuery: "Osaka Castle", coordinates: { lat: 34.6873, lng: 135.5262 } },
            { time: "11:30 - 12:30", description: "Nara'ya Yolculuk (Kintetsu Hattı)", category: "travel", mapQuery: "Kintetsu-Nara Station", coordinates: { lat: 34.6830, lng: 135.8277 } },
            { time: "12:30 - 15:30", description: "Nara Park & Todai-ji (Geyik Besleme ve Dev Buda)", category: "sightseeing", mapQuery: "Nara Park", coordinates: { lat: 34.6851, lng: 135.8430 } },
            { time: "15:30 - 17:30", description: "Den Den Town (Nipponbashi - Anime ve Oyun)", category: "shopping", mapQuery: "Nipponbashi Denden Town", coordinates: { lat: 34.6611, lng: 135.5061 } },
            { time: "17:30 - 19:30", description: "Shinsekai & Tsutenkaku Kulesi", category: "sightseeing", mapQuery: "Shinsekai", coordinates: { lat: 34.6525, lng: 135.5063 } },
            { time: "19:30 - 21:00", description: "Akşam Yemeği (Kushikatsu Daruma)", category: "food", mapQuery: "Kushikatsu Daruma Shinsekai", coordinates: { lat: 34.6525, lng: 135.5063 } },
            { time: "21:00 - 22:00", description: "Tombori Nehir Turu", category: "sightseeing", mapQuery: "Tombori River Cruise", coordinates: { lat: 34.6691, lng: 135.5013 } }
          ]
        }
      ]
    },
    {
      id: "kyoto",
      name: "KYOTO",
      hotel: "REF Kyoto Hachijoguchi",
      dates: "24 - 26 Mayıs",
      imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1600",
      color: "#f59e0b",
      info: {
        weather: "22°C / 14°C",
        currency: "1 JPY ≈ 0.23 TL",
        transport: "Otobüs / Pasmo",
        timezone: "+6 Saat"
      },
      days: [
        {
          date: "24 Mayıs",
          dayName: "Pazar",
          title: "Doğu Kyoto & Kimono",
          activities: [
            { time: "09:30 - 10:30", description: "Kyoto'ya Yolculuk (Osaka'dan JR ile)", category: "travel", mapQuery: "Kyoto Station", coordinates: { lat: 34.9858, lng: 135.7588 } },
            { time: "10:30 - 11:30", description: "Otel Check-in ve Bavul Bırakma", category: "checkin", mapQuery: "REF Kyoto Hachijoguchi", coordinates: { lat: 34.9840, lng: 135.7600 } },
            { time: "11:30 - 12:30", description: "Higashiyama'ya Geçiş", category: "travel", mapQuery: "Higashiyama District", coordinates: { lat: 34.9961, lng: 135.7797 } },
            { time: "12:30 - 13:30", description: "Kimono Kiralama (Rezervasyonlu)", category: "leisure", mapQuery: "Kyoto Kimono Rental", coordinates: { lat: 34.9960, lng: 135.7800 } },
            { time: "13:30 - 15:30", description: "Kiyomizu-dera Tapınağı", category: "sightseeing", mapQuery: "Kiyomizu-dera", coordinates: { lat: 34.9948, lng: 135.7850 } },
            { time: "15:30 - 17:00", description: "Sannenzaka & Ninenzaka Sokakları", category: "sightseeing", mapQuery: "Sannenzaka", coordinates: { lat: 34.9972, lng: 135.7818 } },
            { time: "17:00 - 18:00", description: "Gion & Yasaka Shrine", category: "sightseeing", mapQuery: "Gion", coordinates: { lat: 35.0037, lng: 135.7750 } },
            { time: "18:00 - 18:30", description: "Kimono İade", category: "leisure", coordinates: { lat: 34.9960, lng: 135.7800 } },
            { time: "19:00 - 21:00", description: "Akşam Yemeği", category: "food", mapQuery: "Gion restaurants", coordinates: { lat: 35.0030, lng: 135.7720 } }
          ]
        },
        {
          date: "25 Mayıs",
          dayName: "Pazartesi",
          title: "Batı Kyoto - Bambu & Maymunlar",
          activities: [
            { time: "08:30 - 09:00", description: "Arashiyama'ya Geçiş", category: "travel", mapQuery: "Arashiyama Station", coordinates: { lat: 35.0111, lng: 135.6778 } },
            { time: "09:00 - 10:30", description: "Bambu Ormanı", category: "sightseeing", mapQuery: "Arashiyama Bamboo Grove", coordinates: { lat: 35.0158, lng: 135.6716 } },
            { time: "10:30 - 12:30", description: "Iwatayama Maymun Parkı", category: "sightseeing", mapQuery: "Arashiyama Monkey Park Iwatayama", coordinates: { lat: 35.0094, lng: 135.6766 } },
            { time: "12:30 - 14:00", description: "Öğle Yemeği", category: "food", mapQuery: "Arashiyama restaurants", coordinates: { lat: 35.0110, lng: 135.6770 } },
            { time: "14:00 - 15:30", description: "Tenryu-ji Tapınağı", category: "sightseeing", mapQuery: "Tenryu-ji Temple", coordinates: { lat: 35.0158, lng: 135.6739 } },
            { time: "15:30 - 16:30", description: "Altın Köşk'e Geçiş", category: "travel", coordinates: { lat: 35.0250, lng: 135.7000 } },
            { time: "16:30 - 17:30", description: "Kinkaku-ji (Altın Köşk)", category: "sightseeing", mapQuery: "Kinkaku-ji", coordinates: { lat: 35.0394, lng: 135.7292 } },
            { time: "18:30 - 20:30", description: "Akşam Yemeği", category: "food", coordinates: { lat: 35.0100, lng: 135.7600 } }
          ]
        },
        {
          date: "26 Mayıs",
          dayName: "Salı",
          title: "Merkez, Sanat & Pazar",
          activities: [
            { time: "08:00 - 10:15", description: "Fushimi Inari Shrine (Kırmızı Kapılar)", category: "sightseeing", mapQuery: "Fushimi Inari Taisha", activityImage: "https://images.unsplash.com/photo-1542931237-323a195ca742?auto=format&fit=crop&q=80&w=600" },
            { time: "10:15 - 10:45", description: "İstasyon Bölgesine Dönüş", category: "travel" },
            { time: "11:00 - 14:00", description: "TeamLab Biovortex Kyoto (Rezervasyon Saati: 11:00)", category: "sightseeing", mapQuery: "teamLab Biovortex Kyoto", activityImage: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600" },
            { time: "14:00 - 15:00", description: "Öğle Yemeği", category: "food" },
            { time: "15:00 - 17:30", description: "Nishiki Market (Kapalı Pazar)", category: "shopping", mapQuery: "Nishiki Market", activityImage: "https://images.unsplash.com/photo-1582236471360-394f9ed69bb7?auto=format&fit=crop&q=80&w=600" },
            { time: "17:30 - 19:30", description: "Kawaramachi Keşfi ve Alışveriş", category: "shopping", mapQuery: "Kyoto Kawaramachi" },
            { time: "19:30 - 21:00", description: "Kyoto Veda Yemeği", category: "food" }
          ]
        }
      ]
    },
    {
      id: "tokyo",
      name: "TOKYO",
      hotel: "Daiwa Roynet Hotel Shimbashi",
      dates: "27 Mayıs - 1 Haziran",
      imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1600",
      color: "#3b82f6",
      info: {
        weather: "25°C / 18°C",
        currency: "1 JPY ≈ 0.23 TL",
        transport: "Suica / Metrobüs",
        timezone: "+6 Saat"
      },
      days: [
        {
          date: "27 Mayıs",
          dayName: "Çarşamba",
          title: "Tokyo'ya Varış & Shibuya",
          activities: [
            { time: "10:00 - 11:30", description: "Kyoto İstasyonu & Ekiben Alımı", category: "food", mapQuery: "Kyoto Station Ekiben", coordinates: { lat: 34.9858, lng: 135.7588 } },
            { time: "12:01 - 14:15", description: "Shinkansen ile Tokyo'ya Geçiş (Nozomi 16)", category: "travel", mapQuery: "Tokyo Station", coordinates: { lat: 35.6812, lng: 139.7671 } },
            { time: "14:15 - 15:30", description: "Otel Transfer & Check-in (Shimbashi)", category: "checkin", mapQuery: "Daiwa Roynet Hotel Shimbashi", coordinates: { lat: 35.6664, lng: 139.7583 } },
            { time: "15:30 - 16:30", description: "Shibuya'ya Geçiş", category: "travel", coordinates: { lat: 35.6600, lng: 139.7300 } },
            { time: "16:30 - 18:00", description: "Hachiko & Shibuya Yaya Geçidi", category: "sightseeing", mapQuery: "Shibuya Crossing", coordinates: { lat: 35.6595, lng: 139.7005 } },
            { time: "18:00 - 19:30", description: "Shibuya Sky (Gün Batımı - Rezervasyonlu)", category: "sightseeing", mapQuery: "SHIBUYA SKY", coordinates: { lat: 35.6585, lng: 139.7022 } },
            { time: "19:30 - 21:30", description: "Akşam Yemeği (Uobei Uçan Sushi)", category: "food", mapQuery: "Uobei Shibuya Dogenzaka", coordinates: { lat: 35.6591, lng: 139.6976 } }
          ]
        },
        {
          date: "28 Mayıs",
          dayName: "Perşembe",
          title: "Disneyland",
          activities: [
            { time: "07:00 - 08:15", description: "Erken Kalkış & Maihama'ya Ulaşım", category: "travel" },
            { time: "08:15 - 13:00", description: "Disneyland 1. Yarı (Beauty and the Beast, Pooh)", category: "leisure", mapQuery: "Tokyo Disneyland" },
            { time: "13:00 - 14:00", description: "Öğle Yemeği", category: "food" },
            { time: "14:00 - 19:30", description: "Disneyland 2. Yarı", category: "leisure" },
            { time: "19:30 - 20:30", description: "Elektrikli Geçit & Havai Fişek, Otele Dönüş", category: "leisure" }
          ]
        },
        {
          date: "29 Mayıs",
          dayName: "Cuma",
          title: "Eski Tokyo, Anime",
          activities: [
            { time: "09:00 - 09:45", description: "Asakusa'ya Ulaşım", category: "travel" },
            { time: "09:45 - 12:00", description: "Eski Tokyo (Kaminarimon, Nakamise, Senso-ji Tapınağı)", category: "sightseeing", mapQuery: "Senso-ji" },
            { time: "12:00 - 13:30", description: "Kappabashi (Plastik Yemek Maketleri Sokağı)", category: "shopping", mapQuery: "Kappabashi Street" },
            { time: "13:30 - 14:30", description: "Öğle Yemeği", category: "food" },
            { time: "14:30 - 18:00", description: "Akihabara (Anime, Figür, Oyuncak)", category: "shopping", mapQuery: "Akihabara" },
            { time: "18:30 - 20:30", description: "Akşam Yemeği", category: "food" }
          ]
        },
        {
          date: "30 Mayıs",
          dayName: "Cumartesi",
          title: "Pandalar & Moda",
          activities: [
            { time: "09:30 - 10:00", description: "Ueno'ya Ulaşım", category: "travel" },
            { time: "10:00 - 12:30", description: "Ueno Hayvanat Bahçesi (Dev Pandalar)", category: "sightseeing", mapQuery: "Ueno Zoo" },
            { time: "12:30 - 13:30", description: "Öğle Yemeği", category: "food" },
            { time: "13:30 - 17:00", description: "Harajuku (Takeshita Caddesi, Pamuk Şekeri)", category: "shopping", mapQuery: "Takeshita Street" },
            { time: "17:00 - 19:30", description: "Shinjuku Keşfi (3D Kedi Ekranı)", category: "sightseeing", mapQuery: "Shinjuku Station 3D Cat" },
            { time: "19:30 - 21:00", description: "Akşam Yemeği", category: "food" }
          ]
        },
        {
          date: "31 Mayıs",
          dayName: "Pazar",
          title: "Dijital Sanat & Robotlar",
          activities: [
            { time: "09:00 - 09:45", description: "Yurikamome Hattı ile Yolculuk", category: "travel" },
            { time: "10:00 - 12:30", description: "TeamLab Planets Tokyo (Rezervasyon Saati: 10:00)", category: "sightseeing", mapQuery: "teamLab Planets TOKYO" },
            { time: "12:30 - 13:30", description: "Öğle Yemeği", category: "food" },
            { time: "13:30 - 16:30", description: "Odaiba Adası Keşfi (Gundam Heykeli)", category: "sightseeing", mapQuery: "Odaiba" },
            { time: "16:30 - 18:00", description: "Otele Dönüş & Dinlenme", category: "leisure" },
            { time: "18:00 - 19:30", description: "Ginza Turu (Uniqlo, Itoya)", category: "shopping", mapQuery: "Ginza Uniqlo" },
            { time: "19:30 - 21:30", description: "Akşam Yemeği (Ginza Corridor)", category: "food", mapQuery: "Ginza Corridor Steet" }
          ]
        },
        {
          date: "1 Haziran",
          dayName: "Pazartesi",
          title: "Son Alışveriş & Veda",
          activities: [
            { time: "09:00 - 10:00", description: "Otel Çıkışı & Bavul Emaneti", category: "checkin", mapQuery: "Daiwa Roynet Hotel Shimbashi" },
            { time: "10:00 - 13:30", description: "Serbest Zaman / Hediyelik (Veya Makuhari Outlet)", category: "shopping", mapQuery: "Don Quijote Ginza" },
            { time: "13:30 - 14:30", description: "Son Öğle Yemeği", category: "food" },
            { time: "15:00 - 16:00", description: "Otele Dönüş & Bavulları Alma", category: "checkin" },
            { time: "16:00 - 17:00", description: "Haneda (HND) Havalimanı Transferi", category: "travel", mapQuery: "Haneda Airport Terminal 3" },
            { time: "17:00 - 19:20", description: "Havalimanı & Dönüş Uçağı (19:20)", category: "travel" }
          ]
        }
      ]
    }
  ]
};
