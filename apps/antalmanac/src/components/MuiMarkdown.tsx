import ReactMarkdown, { Options } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Link } from '@mui/material';

export type MuiMarkdownProps = Options

/**
 * A wrapper around the regular markdown renderer that uses MUI components.
 */
export function MuiMarkdown(props: MuiMarkdownProps) {
    return (
        <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
                a: ({ node, ...props }) => {
                    return <Link target="_blank" {...props} />;
                },
            }}
        >
            {props.children}
        </ReactMarkdown>
    );
}
