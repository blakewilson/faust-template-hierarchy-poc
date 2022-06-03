import { getWordPressTemplate, WordPressNode } from "new-faust";
import { GetStaticPropsContext } from "next";
import templates from "wp-templates";
import client from "client";

export default function Page(props: any) {
  return <WordPressNode templates={templates} {...props} />;
}

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getWordPressTemplate({ client, templates, ctx });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
