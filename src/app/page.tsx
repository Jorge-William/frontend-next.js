import Image from 'next/image'
import TaskInput from './components/TaskInput.component'
import TaskList from './components/TaskList.component'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className='m-8 text-3xl decoration-'>Todo!</h1>
      <TaskInput />
      <TaskList />
    </main>
  )
}
