import Link from 'next/link'

export default function Header(props) {
    return (
        <header className="p-5 text-3xl text-left bg-green-800 font h-15 mb-8 ... flex flex-row justify-content">
            <h1 className="ml-4 ... font-bold">{props.header}</h1>
            <img  src="https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/62298.jpg" className></img>
            <Link href={props.path}>
                <a className="bg-gray-220 text-gray-800 rounded-lg mr-4 pb-1 pl-1 pr-1 text-xl" >{props.page}</a>
            </Link>
        </header>
    )
}