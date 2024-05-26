import { Button } from "@/components/ui/button";
import { featuredItems, programs } from "@/constants";
import men from "@/assets/men.png";
import { Card } from "@/components/ui/card";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="container max-w-6xl h-screen mx-auto mt-40 mb-10">
      <div className="w-full flex items-center mb-20">
        <div className="max-w-xl  flex h-full flex-col justify-center">
          <h1 className="text-9xl font-semibold uppercase">Workout with me</h1>
          <p className="text-muted-foreground">
            A huge selection of health and fitness content, healthy recipes and
            transformation stories to help you get fit and stay !
          </p>
          <Link to={"/auth"}>
            <Button className="w-fit mt-6 font-bold h-12" size={"lg"}>
              Join club now
            </Button>
          </Link>

          <div className="mt-24">
            <p className="text-muted-foreground uppercase">as featured in</p>
            <div className="flex items-center gap-4 mt-2">
              {featuredItems.map((Icon, i) => (
                <Icon key={i} className="w-12 h-12" />
              ))}
            </div>
          </div>
        </div>

        <img src={men} alt="img" className="w-1/3" />
      </div>

      <div>
        <h2 className="text-4xl font-semibold">Not sure where to start?</h2>
        <p className="mt-2 text-muted-foreground">
          Programs offer day-to-day guidance on an interactive calendar to keep
          you on track.
        </p>
        <div className="grid grid-cols-3 gap-4 my-8  max-w-5xl">
          {programs.map((item) => (
            <Card
              key={item.title}
              className="p-8 relative cursor-pointer group"
            >
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{item.descr}</p>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform"
              >
                <FaArrowRightLong />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
