export const MovieSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/**Le boite de l'image */}
            <div className="aspect-[2/3] border bg-slate-800 rounded-lg mb-2"></div>
            {/**La ligne du titre */}
            <div className="h-4 bg-slate-800 rounded w-3/4 mb-2"></div>
            {/**La ligne de bote */}
            <div className="h-2 bg-slate-800 rounded w-1/4"></div>
        </div>
    )
}