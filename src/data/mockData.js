export const mockPosts = [
  {
    id: "post_001",
    title: "Amazing travel photos from my recent trip to Japan",
    content: "Just got back from an incredible 2-week journey through Japan! The cherry blossoms were absolutely stunning, and the food was beyond amazing. I tried authentic ramen in Tokyo, visited the famous temples in Kyoto, and even stayed in a traditional ryokan. The bullet trains are as fast as everyone says! Can't wait to share more photos and stories from this adventure. Japan has definitely stolen my heart!",
    author: {
      username: "traveler_sarah",
      id: "user_456"
    },
    reportedReason: "Spam",
    reportedAt: "2024-06-27T10:30:00Z",
    status: "pending",
    reportCount: 3,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop"
  },
  {
    id: "post_002",
    title: "Controversial political statement about recent election",
    content: "I can't believe how the recent election turned out. This is going to ruin our country and I'm seriously considering moving abroad. The policies being proposed are completely insane and will destroy the economy. Everyone who voted for this candidate is an idiot and doesn't understand basic economics. This is the worst thing that could have happened.",
    author: {
      username: "political_voice",
      id: "user_789"
    },
    reportedReason: "Harassment",
    reportedAt: "2024-06-27T09:15:00Z",
    status: "pending",
    reportCount: 8
  },
  {
    id: "post_003",
    title: "Free giveaway - claim your prize now!",
    content: "🎉 CONGRATULATIONS! 🎉 You've been selected for our EXCLUSIVE giveaway! Click here to claim your FREE iPhone 15 Pro Max! Limited time offer - only 24 hours left! Don't miss out on this amazing opportunity! Share with friends to increase your chances! #giveaway #free #iphone #limited #exclusive",
    author: {
      username: "giveaway_official",
      id: "user_123"
    },
    reportedReason: "Spam",
    reportedAt: "2024-06-27T08:45:00Z",
    status: "pending",
    reportCount: 12
  },
  {
    id: "post_004",
    title: "My homemade pizza recipe that everyone loves",
    content: "After years of experimenting, I've finally perfected my homemade pizza recipe! The secret is in the dough - I let it rise for 24 hours in the fridge. For the sauce, I use San Marzano tomatoes, fresh basil, and a touch of oregano. The cheese blend is mozzarella, parmesan, and a little bit of Romano. Bake at 500°F on a pizza stone for that perfect crust. Family and friends always ask me to make this for gatherings!",
    author: {
      username: "chef_mario",
      id: "user_567"
    },
    reportedReason: "Copyright",
    reportedAt: "2024-06-27T07:20:00Z",
    status: "pending",
    reportCount: 1
  },
  {
    id: "post_005",
    title: "Workout routine that changed my life",
    content: "I wanted to share my fitness transformation story. Six months ago, I could barely run a mile. Now I'm running 10K races! The key was consistency and gradually building up. I started with 20-minute walks, then added jogging intervals. Diet was crucial too - more protein, less processed food. The mental health benefits have been incredible. Feeling stronger and more confident than ever!",
    author: {
      username: "fitness_journey",
      id: "user_890"
    },
    reportedReason: "Misinformation",
    reportedAt: "2024-06-27T06:10:00Z",
    status: "approved",
    reportCount: 2
  },
  {
    id: "post_006",
    title: "Inappropriate content targeting minors",
    content: "This post contains inappropriate content that would not be suitable for this demonstration. It has been reported for violating community guidelines regarding the safety of minors.",
    author: {
      username: "suspicious_account",
      id: "user_999"
    },
    reportedReason: "Inappropriate Content",
    reportedAt: "2024-06-27T05:30:00Z",
    status: "rejected",
    reportCount: 25,
    rejectionReason: "Violated community guidelines - inappropriate content"
  },
  {
    id: "post_007",
    title: "Book recommendation: The Midnight Library",
    content: "Just finished reading 'The Midnight Library' by Matt Haig and I'm absolutely blown away! This book explores the concept of parallel lives and the choices we make. The protagonist, Nora, finds herself in a magical library between life and death where she can experience different versions of her life. It's philosophical, heartwarming, and made me reflect on my own life choices. Highly recommend for anyone looking for a thought-provoking read!",
    author: {
      username: "bookworm_kate",
      id: "user_234"
    },
    reportedReason: "Spam",
    reportedAt: "2024-06-27T04:15:00Z",
    status: "approved",
    reportCount: 1
  },
  {
    id: "post_008",
    title: "Hate speech against specific community",
    content: "This post contains hate speech and discriminatory language targeting a specific community. The content has been flagged for violating our community standards and promoting harmful stereotypes.",
    author: {
      username: "anonymous_user",
      id: "user_666"
    },
    reportedReason: "Hate Speech",
    reportedAt: "2024-06-27T03:45:00Z",
    status: "rejected",
    reportCount: 45,
    rejectionReason: "Hate speech and discriminatory content"
  }
];