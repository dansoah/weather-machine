export default async function exceptionGrabber(ctx,next){
    await next();

    //Will do something important
}