/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";

import data from "../../lib/data";
import Calendar from "../../components/calendar";
import Icon from "../../components/icon";

export default function DefaultLayout({ children, page }) {
  const title = page.title
    ? `${page.title} | ${data.seo.siteTitle}`
    : data.seo.siteTitle;
  const description = page.description || data.seo.description;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/ico/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/ico/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/ico/favicon-16x16.png"
        />
        <link rel="manifest" href="/ico/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/ico/safari-pinned-tab.svg"
          color="#068294"
        />
        <link rel="shortcut icon" href="/ico/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="EA UW" />
        <meta name="application-name" content="EA UW&ndash;Madison" />
        <meta name="msapplication-TileColor" content="#CBE5E9" />
        <meta name="msapplication-config" content="/ico/browserconfig.xml" />
        <meta name="theme-color" content="#CBE5E9" />
      </Head>

      <NextSeo
        title={title}
        description={description}
        openGraph={{
          siteName: data.seo.siteName,
          url: data.site.url,
          title: title,
          description: description,
          images: data.seo.images.map((image) => ({
            url: image.image,
            width: image.height,
            height: image.width,
            alt: image.description
          }))
        }}
      />

      <header className={page.largeHeader ? "main-hero" : ""}>
        <div className="container">
          <Link href="/" passHref>
            <div className="organization-group">
              <img
                className="logo"
                src="/uploads/Effective Altruism Lightbulb.svg"
                alt="EA lightbulb Logo"
              ></img>
              <div className="organization-text">
                <h1 className="organization-name">
                  {data.organization.organizationName}
                </h1>
                <h1 className="organization-subheading">
                  {data.organization.organizationSubheading}
                </h1>
              </div>
            </div>
          </Link>
          <nav>
            <ul>
              {data.navbar.links.map((link) => (
                <li key={link.link}>
                  <Link href={link.link}>
                    <a
                      className={"/" + page.slug === link.link ? "active" : ""}
                    >
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section className="main">
        <div className="container">{children}</div>
      </section>

      {page.calendar && (
        <section className="events-section beige-section">
          <div className="container">
            <h2>Events</h2>
            <Calendar />
          </div>
        </section>
      )}

      {page.callToAction === "Contact" && (
        <section className="quote-section">
          <p className="container">
            <Link href="/contact">Contact us</Link> today to find out how we can
            help you. Your first consultation is free.
          </p>
        </section>
      )}

      {page.callToAction === "Blog" && (
        <section className="quote-section">
          <p className="container">
            <Link href="/blog">Read our blog</Link> for an introduction and
            quick tips on various areas of the law.
          </p>
        </section>
      )}

      <footer>
        <div className="container">
          <div
            className="footer-columns"
            data-cms-editor-link="cloudcannon:collections/content/data/footer.json"
          >
            {data.footer.map((column) => (
              <ul className="footer-links" key={column.title}>
                <li>
                  <h2>{column.title}</h2>
                </li>

                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.link}>
                      <a target={link.new_window ? "_blank" : "_self"}>
                        {link.social_icon && <Icon icon={link.social_icon} />}{" "}
                        {link.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}

            <ul className="footer-links">
              <li>
                <div className="organization-group">
                  <h2 className="organization-name">
                    {data.organization.organizationName}
                  </h2>
                  <h2 className="organization-subheading">
                    {data.organization.organizationSubheading}
                  </h2>
                </div>
              </li>
              <li>{data.organization.description}</li>
              <li>
                <Link href="/feed.xml">
                  <a>
                    <Icon icon="RSS" /> Subscribe with RSS
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="legal-line">
          <p className="container">Made with 💡 in Madison, WI</p>
        </div>
      </footer>
    </>
  );
}
