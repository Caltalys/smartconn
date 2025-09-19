type CopyrightProps = {
    text: string;
};

const Copyright = ({ text }: CopyrightProps) => {
    return (
        <div className="bg-primary/70 text-white text-center text-sm py-3 z-10">
            <p>{text}</p>
        </div>
    );
};

export default Copyright;