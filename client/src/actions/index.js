"use server";

export async function explanation (prevState, formData){

    try {
        const language = formData.get("language");
        const code = formData.get("code");
        // const base_url = import.meta.env.VITE_API_URL;
        const result = await fetch(`https://code-explain-ai.vercel.app/api/code-explain`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ language, code }),
        });
        const data = await result.json();
        if(data?.status === true){
            return {
                status: true,
                data: data
            };
        }else{
            return {
                status: false,
                error: "Error fetching code explain"
            }
        }
    }catch(err){
        console.log(err);
        return {status:false, error:err.message};
    }

}