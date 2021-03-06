import DefaultLayout from "./default";

export default function PageLayout({ children, page }) {
  return (
    <DefaultLayout page={page}>
      <div className="page-header">
        <h2>{page.title}</h2>
      </div>

      <article className="content">
        <div dangerouslySetInnerHTML={{ __html: page.contentHTML }} />

        {children}
      </article>
    </DefaultLayout>
  );
}
