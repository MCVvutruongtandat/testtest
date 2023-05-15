import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";

const FadeIn = ({ children, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, delay: delay }}
      exit={{ opacity: 0 }}
      variants={{
        visible: { opacity: 1, translateY: 0 },
        hidden: { opacity: 0, translateY: -200 },
      }}
    >
      {children}
    </motion.div>
  );
};

const FadeListKols = ({ listkols }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const variants = {
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 1,
      },
    }),
    hidden: { opacity: 0 },
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    swipeToSlide: true,
    cssEase: "linear"
  };

  return (
    <motion.ul
      variants={list}
      initial="hidden"
      animate={controls}
      className="kol-list"
      ref={ref}
    >
    <Slider {...settings}>
      {listkols.map((kol, i) => (
        <motion.li variants={variants} custom={i} key={kol.name}>
          <div className="kol-wrapper" style={{'maxWidth': '168px'}}>
            <figure>
              <Image
                className="kol-image"
                src={`/images/home/kol_${i + 1}.png`}
                alt="Các KOLs nổi bật"
                height={479}
                width={168}
              />
              <figcaption>{kol.name}</figcaption>
            </figure>
          </div>
        </motion.li>
      ))}
      </Slider>
    </motion.ul>
  );
};

const FadeListCountry = ({ listCountries }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const variants = {
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 1,
      },
    }),
    hidden: { opacity: 0 },
  };

  return (
    <motion.ul
      variants={list}
      initial="hidden"
      animate={controls}
      className="countrys-list"
      ref={ref}
    >
      {listCountries.map((country, i) => (
        <motion.li variants={variants} custom={i} key={country.name}>
          <div className="country-wrapper">
            <figure>
              <div className="country-name">{country.name}</div>
              <div className="desc">{country.desc}</div>
            </figure>
            <div className="img-wrapper">
              <Image
                src={`/images/home/country${i + 1}.png`}
                alt={country.name}
                quality={100}
                width={80}
                height={80}
              />
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

const FadeListFields = ({ listfields }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const variants = {
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 1,
      },
    }),
    hidden: { opacity: 0 },
  };

  return (
    <motion.ul
      variants={list}
      initial="hidden"
      animate={controls}
      className="list-fields"
      ref={ref}
    >
      {listfields.map((field, i) => (
        <motion.li variants={variants} custom={i} key={field.alt}>
          <figure>
            <Image
              quality={100}
              src={`/images/home/field_00${i + 1}.png`}
              alt={field.alt}
              width={176}
              height={176}
            />
            <figcaption dangerouslySetInnerHTML={field.name}></figcaption>
          </figure>
        </motion.li>
      ))}
    </motion.ul>
  );
};

const FadeListLogos = ({ listLogos }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const variants = {
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 1,
      },
    }),
    hidden: { opacity: 0 },
  };

  return (
    <motion.ul
      variants={list}
      initial="hidden"
      animate={controls}
      className="list-logo"
      ref={ref}
    >
      {listLogos.map((item, i) => (
        <motion.li variants={variants} custom={i} key={item.name}>
          <figure>
            <Image
              src={`/images/show/logo${i + 1}.png`}
              alt={item.name}
              width={item.width}
              height={item.height}
            />
          </figure>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export { FadeIn, FadeListCountry, FadeListKols, FadeListFields, FadeListLogos };
