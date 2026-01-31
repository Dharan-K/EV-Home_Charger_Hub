export interface HomeCharger {
  id: string;
  ownerName: string;
  profilePic: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  chargerType: 'Normal' | 'Fast';
  powerOutput: number;
  pricePerHour: number;
  availability: 'Available' | 'Busy' | 'Offline';
  emergencySupport: boolean;
  availableSlots: string[];
  rating: number;
  totalCharges: number;
}

export const homeChargers: HomeCharger[] = [
  // BANGALORE
  {
    id: '1',
    ownerName: 'Rajesh Kumar',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
    location: '42 Green Valley Road, Bengaluru',
    city: 'Bangalore',
    latitude: 12.9716,
    longitude: 77.5946,
    chargerType: 'Fast',
    powerOutput: 22,
    pricePerHour: 150,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['9:00 AM - 12:00 PM', '6:00 PM - 10:00 PM'],
    rating: 4.8,
    totalCharges: 127
  },
  {
    id: '9',
    ownerName: 'Deepak Patel',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepak',
    location: '88 Tech Park, Whitefield, Bengaluru',
    city: 'Bangalore',
    latitude: 12.9698,
    longitude: 77.7499,
    chargerType: 'Fast',
    powerOutput: 30,
    pricePerHour: 160,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['7:00 AM - 11:00 AM', '4:00 PM - 9:00 PM'],
    rating: 4.9,
    totalCharges: 198
  },
  {
    id: '10',
    ownerName: 'Lakshmi Krishnan',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lakshmi',
    location: '23 Indiranagar, Bengaluru',
    city: 'Bangalore',
    latitude: 12.9716,
    longitude: 77.6412,
    chargerType: 'Normal',
    powerOutput: 11,
    pricePerHour: 85,
    availability: 'Available',
    emergencySupport: false,
    availableSlots: ['8:00 AM - 2:00 PM', '5:00 PM - 10:00 PM'],
    rating: 4.6,
    totalCharges: 145
  },

  // MUMBAI
  {
    id: '2',
    ownerName: 'Priya Sharma',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    location: '15 Sunrise Apartments, Mumbai',
    city: 'Mumbai',
    latitude: 19.076,
    longitude: 72.8777,
    chargerType: 'Normal',
    powerOutput: 7.4,
    pricePerHour: 80,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['10:00 AM - 2:00 PM', '4:00 PM - 8:00 PM'],
    rating: 4.5,
    totalCharges: 89
  },
  {
    id: '11',
    ownerName: 'Rohit Desai',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit',
    location: '56 Bandra Reclamation, Mumbai',
    city: 'Mumbai',
    latitude: 19.0596,
    longitude: 72.8295,
    chargerType: 'Fast',
    powerOutput: 25,
    pricePerHour: 170,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['24/7 Available'],
    rating: 4.7,
    totalCharges: 234
  },
  {
    id: '12',
    ownerName: 'Anjali Verma',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali',
    location: '42 Dadar East, Mumbai',
    city: 'Mumbai',
    latitude: 19.0176,
    longitude: 72.8479,
    chargerType: 'Normal',
    powerOutput: 11,
    pricePerHour: 95,
    availability: 'Busy',
    emergencySupport: false,
    availableSlots: ['9:00 AM - 12:00 PM'],
    rating: 4.4,
    totalCharges: 112
  },

  // HYDERABAD
  {
    id: '3',
    ownerName: 'Amit Patel',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit',
    location: '78 Tech Park Lane, Hyderabad',
    city: 'Hyderabad',
    latitude: 17.385,
    longitude: 78.4867,
    chargerType: 'Fast',
    powerOutput: 50,
    pricePerHour: 250,
    availability: 'Busy',
    emergencySupport: false,
    availableSlots: ['8:00 AM - 11:00 AM'],
    rating: 4.9,
    totalCharges: 203
  },
  {
    id: '13',
    ownerName: 'Kiran Reddy',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kiran',
    location: '34 HITEC City, Hyderabad',
    city: 'Hyderabad',
    latitude: 17.3605,
    longitude: 78.4455,
    chargerType: 'Fast',
    powerOutput: 22,
    pricePerHour: 145,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['6:00 AM - 10:00 AM', '6:00 PM - 11:00 PM'],
    rating: 4.8,
    totalCharges: 189
  },

  // CHENNAI
  {
    id: '4',
    ownerName: 'Sneha Reddy',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha',
    location: '23 Lake View Colony, Chennai',
    city: 'Chennai',
    latitude: 13.0827,
    longitude: 80.2707,
    chargerType: 'Normal',
    powerOutput: 11,
    pricePerHour: 100,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['24/7 Available'],
    rating: 4.7,
    totalCharges: 156
  },
  {
    id: '14',
    ownerName: 'Mohan Kumar',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mohan',
    location: '67 OMR Road, Chennai',
    city: 'Chennai',
    latitude: 12.8329,
    longitude: 80.0355,
    chargerType: 'Fast',
    powerOutput: 30,
    pricePerHour: 155,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['7:00 AM - 6:00 PM'],
    rating: 4.6,
    totalCharges: 167
  },

  // DELHI
  {
    id: '5',
    ownerName: 'Vikram Singh',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram',
    location: '56 Golf Course Road, Delhi NCR',
    city: 'Delhi',
    latitude: 28.7041,
    longitude: 77.1025,
    chargerType: 'Fast',
    powerOutput: 30,
    pricePerHour: 180,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['7:00 AM - 10:00 AM', '5:00 PM - 11:00 PM'],
    rating: 4.6,
    totalCharges: 178
  },
  {
    id: '15',
    ownerName: 'Neha Gupta',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha',
    location: '12 DLF Cyber City, Gurugram',
    city: 'Delhi',
    latitude: 28.4595,
    longitude: 77.0989,
    chargerType: 'Fast',
    powerOutput: 50,
    pricePerHour: 200,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['24/7 Available'],
    rating: 4.9,
    totalCharges: 312
  },
  {
    id: '16',
    ownerName: 'Ashok Verma',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ashok',
    location: '89 Greater Noida, NCR',
    city: 'Delhi',
    latitude: 28.4755,
    longitude: 77.5500,
    chargerType: 'Normal',
    powerOutput: 7.4,
    pricePerHour: 70,
    availability: 'Available',
    emergencySupport: false,
    availableSlots: ['8:00 AM - 8:00 PM'],
    rating: 4.3,
    totalCharges: 98
  },

  // PUNE
  {
    id: '6',
    ownerName: 'Meera Joshi',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera',
    location: '89 Shivaji Nagar, Pune',
    city: 'Pune',
    latitude: 18.5204,
    longitude: 73.8567,
    chargerType: 'Normal',
    powerOutput: 7.4,
    pricePerHour: 70,
    availability: 'Offline',
    emergencySupport: false,
    availableSlots: ['Weekends Only'],
    rating: 4.3,
    totalCharges: 45
  },
  {
    id: '17',
    ownerName: 'Sanjay Kulkarni',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sanjay',
    location: '45 Hinjewadi Tech Park, Pune',
    city: 'Pune',
    latitude: 18.5941,
    longitude: 73.7427,
    chargerType: 'Fast',
    powerOutput: 22,
    pricePerHour: 130,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['9:00 AM - 5:00 PM'],
    rating: 4.7,
    totalCharges: 156
  },

  // KOCHI
  {
    id: '7',
    ownerName: 'Arjun Nair',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
    location: '12 Marine Drive, Kochi',
    city: 'Kochi',
    latitude: 9.9312,
    longitude: 76.2673,
    chargerType: 'Fast',
    powerOutput: 22,
    pricePerHour: 140,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['6:00 AM - 9:00 AM', '7:00 PM - 11:00 PM'],
    rating: 4.8,
    totalCharges: 112
  },

  // AHMEDABAD
  {
    id: '8',
    ownerName: 'Kavitha Menon',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavitha',
    location: '34 Palm Beach Road, Ahmedabad',
    city: 'Ahmedabad',
    latitude: 23.0225,
    longitude: 72.5714,
    chargerType: 'Normal',
    powerOutput: 11,
    pricePerHour: 90,
    availability: 'Available',
    emergencySupport: false,
    availableSlots: ['9:00 AM - 5:00 PM'],
    rating: 4.4,
    totalCharges: 67
  },
  {
    id: '18',
    ownerName: 'Rajiv Patel',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajiv',
    location: '78 Iscon Ambli, Ahmedabad',
    city: 'Ahmedabad',
    latitude: 23.0450,
    longitude: 72.4850,
    chargerType: 'Fast',
    powerOutput: 25,
    pricePerHour: 135,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['24/7 Available'],
    rating: 4.6,
    totalCharges: 189
  },

  // JAIPUR
  {
    id: '19',
    ownerName: 'Ravi Sharma',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi',
    location: '56 C-Scheme, Jaipur',
    city: 'Jaipur',
    latitude: 26.9124,
    longitude: 75.7873,
    chargerType: 'Normal',
    powerOutput: 11,
    pricePerHour: 75,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['8:00 AM - 10:00 PM'],
    rating: 4.5,
    totalCharges: 134
  },

  // KOLKATA
  {
    id: '20',
    ownerName: 'Subhash Das',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=subhash',
    location: '23 AJC Bose Road, Kolkata',
    city: 'Kolkata',
    latitude: 22.5726,
    longitude: 88.3639,
    chargerType: 'Fast',
    powerOutput: 22,
    pricePerHour: 125,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['7:00 AM - 11:00 PM'],
    rating: 4.7,
    totalCharges: 167
  },

  // SURAT
  {
    id: '21',
    ownerName: 'Paras Mehta',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=paras',
    location: '89 VIP Road, Surat',
    city: 'Surat',
    latitude: 21.1458,
    longitude: 72.8326,
    chargerType: 'Normal',
    powerOutput: 11,
    pricePerHour: 80,
    availability: 'Available',
    emergencySupport: false,
    availableSlots: ['9:00 AM - 6:00 PM'],
    rating: 4.4,
    totalCharges: 123
  },

  // CHANDIGARH
  {
    id: '22',
    ownerName: 'Harpreet Singh',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=harpreet',
    location: '45 Sector 35, Chandigarh',
    city: 'Chandigarh',
    latitude: 30.7333,
    longitude: 76.7794,
    chargerType: 'Fast',
    powerOutput: 22,
    pricePerHour: 140,
    availability: 'Available',
    emergencySupport: true,
    availableSlots: ['6:00 AM - 10:00 PM'],
    rating: 4.6,
    totalCharges: 145
  }
];

export const getChargerById = (id: string): HomeCharger | undefined => {
  return homeChargers.find(charger => charger.id === id);
};

export const getDistanceFromUser = (id: string): number => {
  // Simulated distances in km
  const distances: Record<string, number> = {
    '1': 2.3,
    '2': 5.7,
    '3': 8.1,
    '4': 3.4,
    '5': 12.5,
    '6': 6.8,
    '7': 4.2,
    '8': 9.3
  };
  return distances[id] || 10;
};
