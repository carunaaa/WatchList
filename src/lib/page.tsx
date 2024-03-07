import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";

interface Anime {
  studio: string;
  genres: string[];
  title: string;
  images: string;
  start_date: string;
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

        const data = await result.json(); // Convert the response to JSON
        setAnimeList(data); // Set the state with the fetched data
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {animeList.map((anime, index) => (
          <Card key={index} className="flex flex-col justify-between">
            <CardHeader className="flex-row gap-4 items-center">
                <Avatar className="w-50 h-50">
            <AvatarImage src={`/images/${anime.images}`}/>
              <AvatarFallback>{anime.title.slice(0, 3)}</AvatarFallback>
            </Avatar>
              <div>
                <CardTitle>{anime.title}</CardTitle>
                <CardDescription>{anime.studio}</CardDescription>
              </div>
            </CardHeader >
            <CardContent>
              <p className="text-left">{anime.genres}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Start Date</Button>
              {anime.start_date && <p>TBW!</p>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Home;
