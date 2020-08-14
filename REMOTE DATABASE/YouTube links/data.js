function f() {
    const youData = document.querySelectorAll('#thumbnail')

    async function createLink(newLink){

        const link={
            link:newLink.href
        }

        const response = await fetch('https://api.backendless.com/657B8CD6-EE88-F3BD-FF05-24405A958700/86BD0E07-2C1D-4433-BB68-B3C36B22CE59/data/youData',{
            method:'POST',
            body: JSON.stringify(link),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);
    }


    Object.values(youData).forEach(async el=> await createLink(el))
}