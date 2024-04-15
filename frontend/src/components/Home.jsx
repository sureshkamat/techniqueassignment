
import { Button, Center, Spinner,Text } from "@chakra-ui/react";
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Home = () => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(4);
    const [category, setCategory] = useState('');
   
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [totalPage, setTotalPage] = useState();

    const getData=()=>{
        try {
            setLoading(true); // Set loading to true before making the API request
            setError(null);
            let url = `https://dbjsonlive.onrender.com/users?_page=${page}&_limit=${limit}`;
            if (category) {
                url = `https://dbjsonlive.onrender.com/users?_page=${page}&_limit=${limit}&department=${category}`
            }
            axios
                .get(
                    url
                )
                .then((res) => {
                    setData(res.data);
                    setLoading(false); // Set loading to false when data is successfully loaded
                })
                .catch((err) => {
                    console.log(err);
                    setError("Error fetching data. Please try again.");
                    setLoading(false); // Set loading to false in case of an error
                });
        }
        catch (error) {
            console.error("Error while Fetching ", error);
            setError("Error fetching data. Please try again.");
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, [limit, page, category]);

    useEffect(() => {
        let url = 'https://dbjsonlive.onrender.com/users'
        if (category) {
            url = `https://dbjsonlive.onrender.com/users?department=${category}`
        }
        axios.get(
            url
        ).then((res) => setTotalPage(res.data.length));
    }, [category])

    const handleDelete = (id) => {
        try {
            axios.delete(`https://dbjsonlive.onrender.com/users/${id}`)
                .then((res) => { console.log(res); alert(`Id: ${id} Deleted Successfully`);getData(); })
                .catch((err) => console.log.log(err))
        }
        catch (error) {
            console.log('error while deleting')
        }
    }
    
    return (
        <div>
            <div className="top">
                <select onChange={(e) => setLimit(e.target.value)}>
                    <option value={4}>Limit view</option>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option value=''>Department</option>
                    <option value='Services'>Services</option>
                    <option value='Marketing'>Marketing</option>
                    <option value='Business Development'>Business Development</option>
                    <option value='Support'>Support</option>
                    <option value='Accounting'>Accounting</option>
                    <option value='Product Management'>Product Management</option>
                    <option value='Human Resources'>Human Resources</option>
                </select>
                
            </div>{
                data.length===0 && <Center><Text fontSize='xl'>No Record Founds</Text></Center>
            }
            {error && <h1>{error}</h1>}
            {loading ? (<div className="loader">
                <h1>Loading....</h1>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </div>
            ) : (
                <div className="box">
                    {data.map((el) => (
                        <div className="child" key={el.id}>
                            <img
                                src="https://tse2.mm.bing.net/th/id/OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH?rs=1&pid=ImgDetMain"
                                alt="Avatar"
                            />
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '25px' }}>
                                <BadgeIcon style={{ marginRight: '4px', fontWeight: 'bold', color: 'black' }} />
                                : {el.id}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon style={{ marginRight: '9px', fontWeight: 'bold', color: 'black', fontSize: 'large' }} />
                                : {el.firstName} {el.lastName}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <EmailIcon style={{ marginRight: '9px', fontWeight: 'bold', color: 'black', fontSize: 'large' }} />
                                : {el.email}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <PhoneIcon style={{ marginRight: '9px', fontWeight: 'bold', color: 'black', fontSize: 'large' }} />
                                : {el.phone}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <BusinessIcon style={{ marginRight: '9px', fontWeight: 'bold', color: 'black', fontSize: 'large' }} />
                                : {el.department}
                            </div>
                            <Link to={`/edit/${el.id}`} ><button className="edit" >Edit</button></Link>
                            <button onClick={() => handleDelete(el.id)} className="delete">Delete</button>
                        </div>
                    ))}
                </div>
            )}

            <div className="buttonbox">
                <Button colorScheme='teal' variant='outline' onClick={() => setPage(page - 1)} isDisabled={page === 1}>
                    Prev
                </Button>
                <Button colorScheme='teal' variant='outline' >{page}</Button>
                <Button colorScheme='teal' variant='outline'
                    onClick={() => setPage(page + 1)}
                    isDisabled={page === Math.ceil(totalPage / limit) || data.length===0}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}


