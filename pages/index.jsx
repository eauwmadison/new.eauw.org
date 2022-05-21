import Image from "next/image";
import PageLayout from "../components/layouts/page";
import Calendar from "../components/calendar";
import { getCollectionItem } from "../lib/collections";

export default function Home({ page }) {
  return (
    <><PageLayout page={page}>
      <section className="events-section beige-section">
      <div className="container">
        <h2>Events</h2>
        <Calendar />
      </div>
    </section>
        <div className="testimonials">
          {page.testimonials.map((testimonial, i) => (
            <blockquote className="testimonial" key={i}>
              <p className="testimonial-message">{testimonial.message}</p>
              <p className="testimonial-author">
                <Image
                  src={testimonial.testimonialImage}
                  alt={`Photo of ${testimonial.name}`}
                  width={60}
                  height={60} />{" "}
                {testimonial.name}
              </p>
            </blockquote>
          ))}
        </div>
      </PageLayout></>
  );
}

export async function getStaticProps({ params }) {
  const page = await getCollectionItem("pages", "index");

  return {
    props: {
      page: JSON.parse(JSON.stringify(page))
    }
  };
}
