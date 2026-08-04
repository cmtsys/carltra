import Image from "next/image";

type ProjectHeroProps = {
    label?: string
    title: string
    imageSrc: string
    imageAlt: string
    imageWidth: number
    imageHeight: number
}


export default function ProjectHero({
    label,
    title,
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
}: ProjectHeroProps) {
    return (
        <>
            {label && <p className="label">{label}</p>}
            <h1 className="heading-serif heading-serif--centered">{title}</h1>

            <Image
                src={imageSrc}
                className="full-image"
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                sizes="(max-width: 900px) 100vw, 1000px"
                priority
            />
        </>
    );
}