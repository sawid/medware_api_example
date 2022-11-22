import moment from 'moment'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home = ({ posts }: { posts: any }) => {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

      </Head>
      <div className="bg-white py-24 sm:py-32 lg:py-10 font-Prompt">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="sm:text-center">
            <h2 className="text-lg font-semibold leading-8 text-indigo-600">ตัวอย่างการแสดงผล Public API Medware</h2>
            <p className="mt-2 text-3xl font-bold tracking-wide text-gray-900 sm:text-4xl">ตารางเวลารับตรวจของโรงพยาบาล Medware</p>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center mt-5">
            {posts?.map((post: any) => (
              <div className='bg-emerald-50 py-4 rounded-lg px-6' key={post.scheduleId}>
                <div className='border-2 border-slate-300 rounded-md py-2'>
                <p className='text-xl'>{post.scheduleType === 1 ? "นัดพิเศษกับหมอ" : post.scheduleId === 2 ? "ตรวจสุขภาพ" : "บริจาคเลือด"}</p>
                </div>
                <div className='mt-3 text-center'>
                <p><b>สถานที่</b>  {post.scheduleLocation}</p>
                <p><b>วันที่</b> {post.scheduleDate}</p>
                <p><b>เวลา</b> {moment(post.scheduleStart, 'YYYY-MM-DDThh:mm:ss').format('hh.mm')} - {moment(post.scheduleEnd, 'YYYY-MM-DDThh:mm:ss').format('hh.mm')}</p>
                <p className='mt-2'>สามารถจองได้จำนวน</p>
                <p className='text-5xl mt-3'>{post.scheduleCapacity}</p>
                <p className='mt-3'>คิว</p>
                </div>
                
                
                </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://medware1.herokuapp.com/getSlotTime')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  }
}

export default Home