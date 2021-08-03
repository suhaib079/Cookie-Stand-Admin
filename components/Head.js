export default function Head(props) {
    return (
        <head>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
            <title>{props.title}</title>
        </head>
    )
}