import { useState } from "react"
import FaqAccordionItem from "./FaqAccordionItem"

const faqItems = [
    {
        id: "23",
        question: "What is DevTinder?",
        answer:
            "DevTinder is a platform where developers can discover, connect, and collaborate with other developers.",
    },
    {
        id: "2444",
        question: "How does DevTinder work?",
        answer:
            "DevTinder helps developers discover other developers, connect with them, and collaborate on projects, ideas, and opportunities.",
    },
    {
        id: "3",
        question: "Who can join DevTinder?",
        answer:
            "DevTinder is open to developers of all skill levels who want to connect, learn, collaborate, and build with other developers.",
    },
    {
        id: "4",
        question: "Is DevTinder free to use?",
        answer:
            "Yes, DevTinder offers free access to its core features. Some advanced features may be available through a subscription.",
    },
    {
        id: "5",
        question: "What do I get with a subscription?",
        answer:
            "A subscription gives you access to additional features designed to improve your experience and help you connect and collaborate more effectively.",
    },
    {
        id: "6",
        question: "Can I cancel my subscription?",
        answer:
            "Yes, you can cancel your subscription at any time. Your access to subscription features will continue according to the terms of your current billing period.",
    },
    {
        id: "7",
        question: "How do I delete my account?",
        answer:
            "You can delete your DevTinder account from your account settings. Account deletion permanently removes your profile and associated data.",
    },
];

const FaqAccordion = () => {
    const [openId, setOpenId] = useState<string | null>(null)

    const toggleItem = (id: string) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <div className="flex flex-col gap-10">
            {faqItems.map((item) => {
                return <FaqAccordionItem key={item.id} question={item.question} answer={item.answer} id={item.id}
                    isOpen={openId === item.id}
                    onToggle={toggleItem} />
            })}
        </div>
    )
}

export default FaqAccordion