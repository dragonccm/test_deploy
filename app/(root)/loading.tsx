import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function Loadings() {
    return ( 
        <main className="text-center flex flex-col justify-center w-full h-full leading-10">
            <SkeletonTheme baseColor="#202020" highlightColor="#444 " height={200} >
                <p>
                    <Skeleton count={3} />
                </p>
            </SkeletonTheme>
        </main>
    )


}