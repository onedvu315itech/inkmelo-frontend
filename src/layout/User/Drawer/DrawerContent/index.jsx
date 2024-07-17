import SimpleBar from "components/third-party/SimpleBar";
import Navigation from "./Navigation";

export default function DrawerContent() {
    return (
        <>
            <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
                <Navigation />
            </SimpleBar>
        </>
    );
}