import matter from "gray-matter";
const glob = require("glob");
import ReactMarkdown from "react-markdown";

export default function BlogPost(props) {
	return (
		<div>
			<h3>{props.frontmatter.title}</h3>
			<p>
				<ReactMarkdown source={props.markdownBody} />
			</p>
			<p style={{ color: "crimson" }}>{JSON.stringify(props)}</p>
		</div>
	);
}

export async function getStaticProps({ ...context }) {
	const { slug } = context.params;
	const content = await import(`../../posts/${slug}.md`);
	const document = matter(content.default);

	return {
		props: {
			frontmatter: document.data,
			markdownBody: document.content,
			slug,
		},
	};
}

export async function getStaticPaths() {
	const posts = glob.sync("posts/**/*.md");
	const postSlugs = posts.map((file) =>
		file
			.split("/")[1]
			.replace(/ /g, "-")
			.slice(0, -3)
			.trim()
	);
	const paths = postSlugs.map((slug) => `/blog/${slug}`);
	return {
		paths,
		fallback: false,
	};
}
