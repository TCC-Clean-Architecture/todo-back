import { connectDatabase } from '@/main/configs/mongodb'

const init = async (): Promise<void> => {
  await connectDatabase()
}

export default init
