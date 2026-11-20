import CategoryPinScroll from "@/components/CategoryPinScroll";

const therapyCategories = [
  {
    id: "panchakarma",
    title: "Relaxation & Stress Management",
    // sanskrit: "पंचकर्म",
    items: [
      {
        id: "shirodhara",
        title: "SHIRODHARA",
        sanskrit: "शिरोधारा",
        image: "/images/therapy1.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quos natus porro corporis! Quo eligendi excepturi, suscipit iusto ex inventore ipsam exercitationem eos nostrum assumenda?",
      },

      {
        id: "abhyanga",
        title: "ABHYANGA",
        sanskrit: "अभ्यंग",
        image: "/images/therapy2.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quos natus porro corporis! Quo eligendi excepturi, suscipit iusto ex inventore ipsam exercitationem eos nostrum assumenda?",
      },
      {
        id: "stone-abhyanga",
        title: "Stone Abhyanga",
        sanskrit: "अभ्यंग",
        image: "/images/therapy3.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quos natus porro corporis! Quo eligendi excepturi, suscipit iusto ex inventore ipsam exercitationem eos nostrum assumenda?",
      },

      // 5–6 total per category
    ],
  },
  {
    id: "panchakarma1",
    title: "Detoxification & Cleansing",
    // sanskrit: "पंचकर्म",
    items: [
      {
        id: "Virechan",
        title: "Virechan",
        sanskrit: "शिरोधारा",
        image: "/images/therapy1.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quos natus porro corporis! Quo eligendi excepturi, suscipit iusto ex inventore ipsam exercitationem eos nostrum assumenda?",
      },

      {
        id: "niruh-basti",
        title: "Niruh Basti",
        sanskrit: "अभ्यंग",
        image: "/images/therapy2.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quos natus porro corporis! Quo eligendi excepturi, suscipit iusto ex inventore ipsam exercitationem eos nostrum assumenda?",
      },
      {
        id: "anuwasan-basti",
        title: "Anuwasan Basti",
        sanskrit: "अभ्यंग",
        image: "/images/therapy3.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quos natus porro corporis! Quo eligendi excepturi, suscipit iusto ex inventore ipsam exercitationem eos nostrum assumenda?",
      },

      // 5–6 total per category
    ],
  },
  // 4 more categories...
];

export default function TherapyPage() {
  return (
    <main>
      <div className="h-screen relative w-full bg-black">
        <img
          src="/images/video-bg.png"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 w-full h-full">
          <div className="flex flex-col w-full h-full justify-center items-center text-white">
            <h1 className="text-4xl font-bold">Content here</h1>
            <p className="max-w-md text-justify text-sm leading-relaxed mt-10 px-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla,
              eveniet saepe? Laborum laudantium, accusantium, neque tempora
              debitis illum, iste reiciendis unde ratione porro ut maxime.
            </p>
          </div>
        </div>
      </div>
      {therapyCategories.map((category) => (
        <CategoryPinScroll key={category.id} category={category} />
      ))}
    </main>
  );
}
