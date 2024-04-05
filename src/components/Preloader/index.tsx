import { FC } from 'react';
import { Preloader } from "../../icons";

type LoaderProps = {
    height?: number
    width?: number
}
const Loader: FC<LoaderProps> = ({ height = 100, width = 100 }) => {
    return (
        <div style={{ minHeight: "20rem" }} className={"w-100p h-100p f-c-col f-1"}>
            <div className="f-c-col infiniteSpin w-content h-content">
                <Preloader height={height} width={width} />
            </div>

        </div>
    );
};
export const BigSpinner = () => {
    return (
        <div className={"d-f jc-center al-center"}>
            <Loader />
        </div>
    )
}

type CustomSpinnerProps = {
    height: number,
    width: number
}
export const CustomSpinner: FC<CustomSpinnerProps> = ({height, width}) => {
    return <div className="infiniteSpin f-c-col"><Preloader height={height} width={width} /></div>
}
export default Loader;