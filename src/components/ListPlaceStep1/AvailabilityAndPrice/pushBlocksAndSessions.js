// Fetch request
import fetch from './../../../core/fetch';

function parseMomentToString(blocks) {
  for (let block of blocks) {
    for (let day of block) {
      if (day && day.startTime && day.startTime.format) {
        day.startTime = day.startTime.format('HH:mm');
      }
      if (day && day.endTime && day.endTime.format) {
        day.endTime = day.endTime.format('HH:mm');
      }
    }
  }
}

function mergeSessionsWithBlocksId(blocks, blocksFromDatabase) {
  const sessions = [];
  for (let i = 0; i < blocks.length; ++i) {
    for (let session of blocks[i]) {
      if(session.id) {
      sessions.push({
        ...session,
        // blockId: blocksFromDatabase.data.CreateBlocks[i].id,
         blockUniqueId: blocksFromDatabase.data.CreateBlocks[i].blockUniqueId
      })
    } else {
        sessions.push({
          ...session,
          blockId: blocksFromDatabase.data.CreateBlocks[i].id,
          blockUniqueId: blocksFromDatabase.data.CreateBlocks[i].blockUniqueId
        })
    }
    }
  }
  return sessions;
}


async function pushBlocksAndSessions(values) {
  if (values.blocks && values.basePrice) {
    const {blocks, basePrice} = values;
    const listId = values.id;
   
    const createBlocksQuery = `
       mutation CreateBlocks(
           $blockList: [BlockInputType]!,
           ){
              CreateBlocks(
                blockList: $blockList,
              ) {
                id,
                listId,
                price,
                blockUniqueId
              }
            }    
      `;
  
    const createSessionsQuery = `
        mutation CreateSessions(
           $sessionList: [Session]!,
           ){
              CreateSessions(
                sessionList: $sessionList,
              ) {
                 status
              }
            }
      `;
    const blocksResponse = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: createBlocksQuery,
        variables: {
          blockList: blocks.map((item,index) => ({
            id: item[0].blockId,
            listId,
            price: basePrice//same price for every block
          }))
        }
      }),
      credentials: 'include'
    });

    const blocksData = await blocksResponse.json();
    parseMomentToString(blocks);
    if (blocksData && blocksData.data && blocksData.data.CreateBlocks) {
      const sessions = mergeSessionsWithBlocksId(blocks, blocksData);
      const sessionsInDatabase = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: createSessionsQuery,
          variables: {
            sessionList: sessions
          }
        }),
        credentials: 'include'
      });

      const {data} = await sessionsInDatabase.json();
      if (data && data.CreateSessions && data.CreateSessions.status === 'success') {
        return 'success';
      }
    } else {
      return 'failed to save blocks';
    }
  }
}

export default pushBlocksAndSessions;
