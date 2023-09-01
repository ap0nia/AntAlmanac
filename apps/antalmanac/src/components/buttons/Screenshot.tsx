import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button, type ButtonProps, IconButton, Link, Tooltip, useTheme } from '@mui/material';
import { Panorama as PanoramaIcon, PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import analyticsEnum, { logAnalytics } from '$lib/analytics';
import { screenshotElementId } from '$lib/constants';

export interface ScreenshotButtonProps extends ButtonProps {
    /**
     * Provide a React ref to the element to screenshot.
     */
    imgRef?: React.RefObject<HTMLElement>;

    /**
     * Whether to only show the icon.
     */
    iconOnly?: boolean;
}

/**
 * Button that downloads a screenshot of the element referenced by {@link ScreenshotButtonProps.imgRef}
 */
export function ScreenshotButton(props: ScreenshotButtonProps) {
    const { imgRef, iconOnly, ...buttonProps } = props;

    const theme = useTheme();

    /**
     * ref to an invisible link used to download the screenshot
     */
    const ref = useRef<HTMLAnchorElement>(null);

    const handleClick = async () => {
        const elementToScreenshot = imgRef?.current ?? document.getElementById(screenshotElementId);

        if (!elementToScreenshot || !ref.current) {
            return;
        }

        logAnalytics({
            category: analyticsEnum.calendar.title,
            action: analyticsEnum.calendar.actions.SCREENSHOT,
        });

        const canvas = await html2canvas(elementToScreenshot, {
            scale: 2.5,
            backgroundColor: theme.palette.background.paper,
        });

        ref.current.href = canvas.toDataURL('image/png');
        ref.current.download = 'Schedule.png';
        ref.current.click();
    };

    return (
        <>
            <Tooltip title="Get a screenshot of your schedule">
                {iconOnly ? (
                    <IconButton onClick={handleClick} {...buttonProps}>
                        <PhotoCameraIcon />
                    </IconButton>
                ) : (
                    <Button onClick={handleClick} startIcon={<PanoramaIcon fontSize="small" />} {...buttonProps}>
                        Screenshot
                    </Button>
                )}
            </Tooltip>
            <Link sx={{ display: 'none' }} ref={ref} href="/" />
        </>
    );
}
