import Image from "next/image";
import { FC } from "react";

import classes from "./hero.module.css";

const Hero: FC = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/jovan.png"
          alt="An image showing Jovan"
          width={300}
          height={300}
          layout="responsive"
        />
      </div>
      <h1>Hi, I&apos;m Jovan</h1>
      <p>I blog about web development especially frontend framework React.</p>
    </section>
  );
};

export default Hero;
