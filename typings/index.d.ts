declare module '*.png';
declare module '*.css';
declare module '*.less';

interface ComponentStyleProps {
    className?: string;
    style?: { [key: string]: string }
}
