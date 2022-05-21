import Image from "next/image";

import DefaultLayout from "./default";

export default function PageLayout({ children, page }) {
  return (
    <DefaultLayout page={page}>
      <div className="page-header">
        <h2>{page.title}</h2>
        {console.log(page.mainImage)}
      </div>

      <article className="content">
        <Image
          width={100}
          height={100}
          src="https://eauw.org/img/members.png"
          alt="members"
        ></Image>
        <div dangerouslySetInnerHTML={{ __html: page.contentHTML }} />

        {children}
      </article>
    </DefaultLayout>
  );
}
