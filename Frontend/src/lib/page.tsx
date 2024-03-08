import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import  { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";

interface Anime {
  studio: string;
  genres: string[];
  title: string;
  images: string;
  start_date: string;
  Status: string;
}

const Home = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("http://localhost:4000/anime");
        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }

        const contentType = result.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await result.json();
        setAnimeList(data);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStatusButtonClick = (index: number) => {
    const updatedAnimeList = [...animeList];
    const newStatus =
      updatedAnimeList[index].Status === "TBW"
        ? "Currently Watching"
        : updatedAnimeList[index].Status === "Completed"
        ? "TBW"
        : "Completed";
    updatedAnimeList[index].Status = newStatus;
    setAnimeList(updatedAnimeList);
  };

  return (
    <main>
      <div className="grid grid-cols-4 gap-8">
        {animeList.map((anime, index) => (
          <Card
            key={index}
            className={`flex flex-col justify-between ${
              anime.Status === "Completed" ? "grayscale" : ""
            }`}
            style={{
              border:
                anime.Status === "Currently Watching"
                  ? "2px solid #00f"
                  : anime.Status === "TBW"
                  ? "2px solid #0f0"
                  : "2px solid #aaa",
            }}
          >
            <Avatar className="flex items-center w-50 h-50 relative">
              {anime.Status === "Completed" && (
                <div
                  className="absolute top-0 right-0 flex items-center text-white"
                  style={{
                    backgroundColor: "#9B4444",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    color: "white",
                  }}
                >
                  Completed!
                </div>
              )}
              <AvatarImage src={`/images/${anime.images}`} />
              <AvatarFallback>{anime.title.slice(0, 3)}</AvatarFallback>
            </Avatar>
            <CardHeader className="flex-row gap-4 items-center">
              <div>
                <CardTitle style={{ color: "gray-900" }}>
                  {anime.title}
                </CardTitle>
                <CardDescription>{anime.studio}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-left">{anime.genres}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => handleStatusButtonClick(index)}
                style={{
                  backgroundColor:
                    anime.Status === "Completed"
                      ? "#aaa"
                      : anime.Status === "TBW"
                      ? "#114232"
                      : "#1B3C73",
                }}
              >
                {anime.Status === "Completed"
                  ? "Completed"
                  : anime.Status === "TBW"
                  ? "TBW!"
                  : "Currently Watching"}
              </Button>
              <span style={{ fontSize: "12px" }}>{anime.start_date}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Home;


