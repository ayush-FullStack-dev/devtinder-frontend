import { useState } from "react"
import FaqAccordionItem from "./FaqAccordionItem"

const fagItems = [{
    id: "23",
    question: "What is DevTinder?",
    answer: "DevTinder is a platform where developer can discover, connect, and collaborate with other developers."
},
{
    id: "2444",
    question: "How does DevTinder work?",
    answer: "DevTinder is a platform where developer can discover, connect, and collaborate with other developers."
}
]

const FaqAccordion = () => {
    const [openId, setOpenId] = useState<string | null>(null)

    const toggleItem = (id: string) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <div className="flex flex-col gap-10">
            {fagItems.map((item) => {
                return <FaqAccordionItem key={item.id} question={item.question} answer={item.answer} id={item.id} 
                isOpen={openId === item.id} 
                onToggle={toggleItem} />
            })}
        </div>
    )
}

export default FaqAccordion