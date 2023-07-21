import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './App.css';

function App() {

    const [url, setUrl] = useState('');
    const [urls, setUrls] = useState([]);
    const baseUrl = window.location + 'api/shorturl/';

    toast({
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    const handleChange = (e) => {
        setUrl(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify({ url }),
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await response.json();


            if (!json.error) {
                navigator.clipboard.writeText(baseUrl + json.short_url);

                toast.info('link copied');
                setUrl('');
            } else {
                toast.error('invalid url');
            }

        } catch (error) {
            toast.error('something went wrong');
        }
    }


    useEffect(() => {
        fetch(window.location + 'api').then(res => res.json()).then(urls => {
            setUrls(urls);
        });
    }, [url]);

    return (
        <>
            <main className='bg-gray-900 w-full mx-auto'>
                <h1 className=" text-center mt-5 text-5xl font-extrabold tracking-tight leading-none text-white">Url Shortener</h1>

                <section className='my-7 w-4/5 mx-auto h-[45px]'>
                    <form action='api/shorturl' method="post" className='h-full' onSubmit={handleSubmit}>
                        <input
                            className="w-5/6 h-full px-3 outline-none text-sm text-white rounded-s-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            type="text"
                            name='url'
                            placeholder='https://f4rukyldrm-url-shortener.onrender.com'
                            onChange={handleChange}
                            value={url}
                        />

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-1/6 text-gray-400 text-sm border border-gray-600 h-full py-2 outline-none rounded-e-lg hover:bg-gray-600 hover:text-white"
                        >shorten</button>
                    </form>
                </section>
                <section className='w-4/5 mx-auto'>
                    <div className='relative overflow-x-auto rounded-lg'>
                        <table className='w-full text-sm text-left text-gray-400'>
                            <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
                                <tr className='px-6 py-3'>
                                    <th className='px-6 py-3'>Full Url</th>
                                    <th className='px-6 py-3'>Short Url</th>
                                    <th className='px-6 py-3'>Clicks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    urls.map(({ original_url, short_url, clicks }) => (
                                        <tr className='border-b bg-gray-800 border-gray-700 hover:bg-gray-600'>
                                            <td className='px-6 py-2.5'>{original_url}</td>
                                            <td className='px-6 py-2.5'>
                                                <a className="font-medium text-blue-500 hover:underline" href={baseUrl + short_url}>{short_url}</a>
                                            </td>
                                            <td className='px-6 py-2.5'>{clicks}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                </section>
            </main>
        </>
    );
}

export default App;