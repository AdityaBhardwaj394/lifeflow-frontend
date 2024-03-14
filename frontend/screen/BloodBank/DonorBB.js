import { View, Text } from 'react-native'
import React from 'react'
const DonorBB = () => {
  const [id,setId] = useState(null);
  const [emailBB,setEmailBB] = useSelector
  const [res,setRes]= useState(null);
  const [err,setErr] = useState(null);
  useEffect(()=>{
    const getData= async()=>{
      try{
        const response = await api.get(`/donor/${id}`);
      }
      catch(err)
      {
        console.log("Error:",err);
        setErr(err);
      }
      finally{
        setErr(null);
      }
    }
    
  },[])
  return (
    <FlatList
        data={res}
        renderItem={({item}) => 

        <View>
          <Text>{item.poi.name}</Text>
        </View>

        }/>
  )
}

export default DonorBB