import { useState } from "react"

const topics: {id:number, name:string, comments: {text: string}[]}[] = [
    {
        id: 1,
        name: "How to center a div?",
        comments: [
            {
                text: "idk"
            },
            {
                text: "u can center it throught position absolute"
            },
            {
                text: "haha, its the most important question"
            }
        ]
    },
    {
        id: 2,
        name: "how work with objects in js?",
        comments: [
            {
                text: "u can interact with object using  objectName.length its function, objectName.name to get name of object"
            }
        ]
    }
]

export default function Discussion() {

    const [newTopic, setNewTopic] = useState(false);

    return (
        <div className="flex flex-col mt-10 ml-10 p-6 rounded-xl bg-zinc-200 w-315 max-[786px]:w-75 max-[786px]:ml-0 ">
            <div className="flex flex-row max-[786px]:flex-col justify-between">
                <p className="text-2xl font-bold">Discussion Forum</p> 
                <button className="btn w-fit max-[786px]:mt-5" onClick={() => setNewTopic(!newTopic)}>Create a topic</button>
            </div>
            <div className="flex flex-wrap mt-10 gap-10 w-full">
                {topics.map((topic, index) => (
                    <div key={index} className="w-97 p-6 flex flex-col border-1 rounded-xl">
                        <p className="text-xl font-bold">{topic.name}</p>
                        <p className=" mb-5">Comments: {topic.comments.length}</p>
                        <button className="btn">See</button>
                    </div>
                ))}
            </div>
            {newTopic && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
                    <div className="flex justify-center items-center rounded-xl bg-zinc-200 max-[786px]:w-75 w-100 h-75 p-6">
                        <form className="flex flex-col justify-center w-full items-center gap-5" action="">
                            <p className="text-2xl font-bold">Create a new topic</p>
                            <input type="text" className="input" placeholder="Enter the topic name"/>
                            <input type="text" className="input" placeholder="Enter the programming language"/>
                            <div className="">
                                <button className="btn ml-3 mr-3 btn-error" onClick={() => setNewTopic(!newTopic)}>Cancel</button>
                                <button className="btn ml-3 mr-3 btn-primary" onClick={() => setNewTopic(!newTopic)}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}