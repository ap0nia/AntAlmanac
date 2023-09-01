import { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
    type DialogProps,
} from '@mui/material';

const markdown = `
AntAlmanac is a schedule planning tool for UCI students.


Interested in helping out? Join our [Discord](https://discord.gg/GzF76D7UhY)
or checkout the [code on GitHub](https://github.com/icssc/AntAlmanac).


This website is maintained by the [ICS Student Council](https://studentcouncil.ics.uci.edu/)
Projects Committee and built by students from the UCI community.

<a target="_blank" href="https://github.com/icssc/AntAlmanac/contributors">
    <img
        src="https://contrib.rocks/image?repo=icssc/antalmanac"
        width='100%'
        alt="AntAlmanac Contributors"
    />
</a>
`;

export function AboutDialog(props: DialogProps) {
    /**
     * This is destructured separately for memoization.
     */
    const { onClose } = props;

    const handleClose = useCallback(() => {
        onClose?.({}, 'escapeKeyDown');
    }, [onClose]);

    return (
        <Dialog {...props}>
            <DialogTitle>Add Schedule</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            a: ({ node, ...props }) => {
                                return <Link target="_blank" {...props} />;
                            },
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
