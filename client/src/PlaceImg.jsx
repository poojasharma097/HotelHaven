export default function PlaceImg ({place,index=0,className=null}){
    if (!place.photos?.length) {
        return '';
    }
    if (!className) {
        className = " w-48 h-32 object-cover";
    }
    return (
        <img className={className} src={'https://hotelhaven-i9un.onrender.com/uploads/'+place.photos[index]} />
    );
}