export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  genre?: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  content: {
    introduction: string;
    sections: {
      heading: string;
      content: string;
    }[];
    conclusion: string;
  };
  tags: string[];
}

export const articles: Article[] = [
  {
    id: "001",
    title: "The Last Signal from Kepler-442",
    subtitle: "When humanity reaches out across the stars, something reaches back",
    category: "Stories",
    genre: "Sci-Fi",
    date: "Jan 12, 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    author: {
      name: "Sulung Arung",
      avatar: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      bio: "Fiction writer exploring the boundaries of space and time",
    },
    content: {
      introduction:
        "The message arrived at 03:14 station time — not in radio waves or laser pulses, but as a trembling in the dark matter weave itself. Dr. Yara Osei sat alone at Console Seven when the instruments began their frantic song, and she understood before any algorithm did: we were no longer the ones asking the question.",
      sections: [
        {
          heading: "The Signal Architecture",
          content:
            "It was structured like music — nested harmonics that unfolded into mathematics, then biology, then something the linguists would spend decades calling 'emotional syntax.' The signal did not describe a civilization. It described a feeling. And the feeling was, unmistakably, longing.",
        },
        {
          heading: "Yara's Choice",
          content:
            "She had forty seconds before the automated broadcast protocols would alert the entire station. Forty seconds in which she could be the only human being who had ever truly heard another intelligence speak. She pressed her palm against the cold metal of the console and listened. The signal repeated, patient as starlight.",
        },
        {
          heading: "What the Stars Keep",
          content:
            "The response teams argued for months about what to send back. Politicians wanted triumph. Scientists wanted data. The poets — nobody listened to the poets until Yara played the recording in an empty conference room and a veteran mission commander began to cry. They sent back music. A child's lullaby, recorded in seventeen languages.",
        },
        {
          heading: "Silence After",
          content:
            "Kepler-442 went quiet after that. Some said they had offended. Some said they had been deemed not ready. Yara believed neither. She believed the signal had never been intended for civilization — it had been intended for the one person awake at 03:14, alone with the dark, willing to simply listen.",
        },
      ],
      conclusion:
        "We build telescopes to close the distance between ourselves and the infinite. But sometimes the infinite already knows where we are. Sometimes it has been waiting, quietly, for us to stop broadcasting and start listening.",
    },
    tags: ["science fiction", "space", "first contact", "loneliness"],
  },
  {
    id: "002",
    title: "Paper Cranes in the Rain",
    subtitle: "A love story told in origami, memory, and things unsaid",
    category: "Stories",
    genre: "Romance",
    date: "Jan 28, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=80",
    author: {
      name: "Sulung Arung",
      avatar: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      bio: "Fiction writer exploring the boundaries of space and time",
    },
    content: {
      introduction:
        "She learned to fold paper cranes the winter her mother left, working through three reams of printer paper before her fingers remembered the angles without thinking. By spring she had given them all away — to neighbors, to strangers on buses, tucked under the wipers of cars whose owners looked sad. One landed, somehow, on the desk of a man named Io, who kept it for eleven years.",
      sections: [
        {
          heading: "The First Fold",
          content:
            "Io found the crane on a Tuesday during the sort of rain that makes the whole city smell like old books. He had been sitting in a borrowed office, considering a letter of resignation. The crane sat on his keyboard, slightly damp, wings trembling in the draft from the air conditioner. He did not resign that day.",
        },
        {
          heading: "A Thousand Cranes",
          content:
            "Japanese legend promises that folding a thousand cranes grants a single wish. She had stopped counting at three hundred, the winter she was fifteen. She had wished for her mother to return. By the time she met Io — in a bookshop doorway during another November rain — she had decided wishes were beside the point. Presence was the point. Showing up in doorways.",
        },
        {
          heading: "What He Kept",
          content:
            "He still had the crane. That was the first thing she noticed about his apartment — the glass case on the shelf, containing one slightly weathered paper crane beside a small card that read 'Tuesday, Rain.' She recognized the fold pattern immediately. Her fold pattern. The particular way she creased the wingtips.",
        },
        {
          heading: "The Eleven-Year Question",
          content:
            "He asked how she had known to leave it. She told him she hadn't. She told him she had been walking past a building during a rainstorm, seen a window lit against the grey, and felt an overwhelming urgency to fold something and send it upward. Love, she had come to believe, worked like that sometimes — not chosen, not planned, just delivered to the right desk at the right hour.",
        },
      ],
      conclusion:
        "They stayed in the doorway until the rain stopped. Then they went inside. Some stories do not need more than that: the rain, the shelter, two people who had been circling each other across eleven years of a city that was, it turned out, never quite big enough to keep them apart.",
    },
    tags: ["romance", "fate", "origami", "love"],
  },
  {
    id: "003",
    title: "The House on Hollow Road",
    subtitle: "It watches. It waits. And it always remembers.",
    category: "Stories",
    genre: "Horror",
    date: "Feb 3, 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80",
    author: {
      name: "Sulung Arung",
      avatar: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      bio: "Fiction writer exploring the boundaries of space and time",
    },
    content: {
      introduction:
        "The real estate listing did not mention that the house breathed. It mentioned original hardwood floors, a claw-foot tub, and the charming overgrown garden. It mentioned good bones. Maren Lux had always trusted bones. She should have asked what the bones remembered.",
      sections: [
        {
          heading: "First Night",
          content:
            "The sound began at 2 AM — not footsteps exactly, but the rhythm of footsteps. The negative space of a presence. The floorboards compressed without weight. The curtains moved without wind. Maren lay still and counted the sounds and told herself: old houses settle. Old houses are full of trapped air and memory. She counted to forty-seven before sleep took her.",
        },
        {
          heading: "The Photographs",
          content:
            "She found them in the basement — not hidden, just forgotten. Forty years of a family she did not recognize, in rooms she did recognize because they were her rooms now. The last photograph was different from the others. Every face had been removed. Cut out with scissors, with the care of someone performing surgery. Only the house remained, the same in every picture, unmoved by the decades.",
        },
        {
          heading: "What the Walls Know",
          content:
            "The neighbor across the road told her, over the fence, that the previous family had moved in the winter and been gone by spring. And the family before that. And the family before that. He said this without emphasis, the way you might describe weather. She asked what happened to them. He considered the question for a long moment. 'Nothing happened,' he said. 'That's what makes it so strange.'",
        },
        {
          heading: "Her Decision",
          content:
            "Maren was not the kind of woman who ran. She was the kind of woman who made notes. She filled three notebooks that spring, cataloguing every sound, every temperature drop, every mirror that showed more than it should. The house seemed to appreciate this. The sounds grew quieter. The curtains settled. By summer, she understood: the house did not want victims. It wanted witnesses.",
        },
      ],
      conclusion:
        "She is still there. The lights in her study burn past midnight most nights. If you drive down Hollow Road — and you should not, but if you do — you will see her silhouette in the window, bent over her notebooks, and behind her, just at the edge of visible, something that might be shadow. Something that watches her write, patient and ancient and satisfied.",
    },
    tags: ["horror", "haunting", "psychological", "atmosphere"],
  },
  {
    id: "J001",
    title: "On Finishing Things",
    subtitle: "A journal entry about the strange grief of completing what you love",
    category: "Journals",
    genre: "Personal",
    date: "Feb 8, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&q=80",
    author: {
      name: "Sulung Arung",
      avatar: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      bio: "Fiction writer exploring the boundaries of space and time",
    },
    content: {
      introduction:
        "I finished the draft at 11:47 PM on a Wednesday, and my first feeling was not triumph. It was something closer to bereavement. The characters I had lived with for eight months were still alive in my head — still walking around, still making their mistakes — but the book was done, and that meant they were no longer mine to follow.",
      sections: [
        {
          heading: "The Ending Problem",
          content:
            "Nobody tells you that finishing a long project is its own kind of grief. We celebrate endings — parties, certificates, the closing of a cover. But grief and celebration are not opposites. They are neighbors, sharing a wall. I have finished four novels now and each time I sit with the strange quiet of the last page and wonder what to do with the empty hours.",
        },
        {
          heading: "What Remains",
          content:
            "I keep a notebook of things I noticed while writing — images, sentences that didn't make the cut, questions I couldn't answer. It's not about the work. It's about proving I was present. That those eight months happened. That the characters were, in some way that matters, real enough to leave marks.",
        },
        {
          heading: "Beginning Again",
          content:
            "The cure, I've found, is not to immediately start something new — that only defers the grief. The cure is to sit with the finished thing. Read it. Let it be done. Then, when the grief has done its work, the next beginning arrives on its own: a name, a place, a voice you haven't heard before, asking to be followed.",
        },
      ],
      conclusion:
        "Every ending is a kind of courage. You decided the story was complete, which means you decided to let it go. That is its own art form. The art of the open hand.",
    },
    tags: ["writing life", "creativity", "journals", "process"],
  },
  {
    id: "J002",
    title: "The 4 AM Hours",
    subtitle: "There are kinds of thinking that only happen in the dark",
    category: "Journals",
    genre: "Reflection",
    date: "Jan 20, 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    author: {
      name: "Sulung Arung",
      avatar: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      bio: "Fiction writer exploring the boundaries of space and time",
    },
    content: {
      introduction:
        "I am reliably awake between 4 and 5 AM. This used to disturb me. Now I protect it. There is a quality of thought available only in that hour — before the day has its demands, before the world comes online — that I have found nowhere else.",
      sections: [
        {
          heading: "What the Dark Allows",
          content:
            "In daylight, thinking has an audience. Even alone, we perform our thoughts for some imagined observer. At 4 AM there is no observer. The thoughts arrive without announcement and leave without apology. I have solved plot problems at 4 AM that daytime could not touch. I have also cried, unexpectedly, about things I did not know I was carrying.",
        },
        {
          heading: "The Practice",
          content:
            "I keep a glass of water and a notebook beside the bed. No phone. The phone is the end of the 4 AM hours — it immediately restores the audience. The notebook is different. It receives without judgment. Some mornings there are three words. Some mornings, pages. Both count.",
        },
      ],
      conclusion:
        "The 4 AM hours are not about productivity. They are about acquaintance — with yourself, with the particular shape of your mind when it is not trying to impress anyone. I recommend them to everyone, though I know they can't be scheduled. They arrive when they're ready.",
    },
    tags: ["insomnia", "creativity", "night", "writing life"],
  },
  {
    id: "IL001",
    title: "Ink and Light: Sketching the Unseen",
    subtitle: "A visual journey through the spaces between words",
    category: "Illustrations",
    genre: "Art",
    date: "Feb 10, 2026",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?w=1920&q=80",
    author: {
      name: "Sulung Arung",
      avatar: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      bio: "Fiction writer exploring the boundaries of space and time",
    },
    content: {
      introduction:
        "Every story I write begins not with a sentence but with an image — a quality of light on a particular surface, or the posture of a figure standing in a doorway. Illustration is my way of finding those images before the words arrive.",
      sections: [
        {
          heading: "The Visual First Draft",
          content:
            "I draw badly, which is to say I draw honestly. My sketches are not meant to be seen — they are meant to see. A quick pencil rendering of a room tells me things about that room that description cannot: the proportions of loneliness, the geometry of safety or threat. The illustration is a tool for understanding, not a product.",
        },
        {
          heading: "What Ink Knows",
          content:
            "Ink is committed in a way pencil is not. When you lay down ink, you are deciding. That decisiveness — the understanding that you cannot unsay what you have drawn — teaches something about narrative. Every scene in a story is ink: you have chosen this moment, this arrangement, this light. Own it.",
        },
      ],
      conclusion:
        "The unseen spaces of a story — the texture of the walls, the color of a character's fear — live in illustration. I draw to find what the words don't know yet.",
    },
    tags: ["illustration", "art process", "visual", "creativity"],
  },
];

export const getArticleById = (id: string): Article | undefined => {
  return articles.find((article) => article.id === id);
};

export const getRelatedArticles = (currentId: string, limit = 3): Article[] => {
  const current = articles.find((a) => a.id === currentId);
  if (!current) return articles.slice(0, limit);
  return articles
    .filter((a) => a.id !== currentId && a.category === current.category)
    .slice(0, limit)
    .concat(
      articles
        .filter((a) => a.id !== currentId && a.category !== current.category)
        .slice(0, Math.max(0, limit - articles.filter((a) => a.id !== currentId && a.category === current.category).slice(0, limit).length))
    )
    .slice(0, limit);
};
