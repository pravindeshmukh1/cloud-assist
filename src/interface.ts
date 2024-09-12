export interface Message {
    message: string,
    id: number,
    msgBy: string,
  }

export interface MsgResponse{
    response:string,
    text: string,
    date: string,
    resp_time:string  
}
export interface Bot {
    size: string;
    noOfDocs: string;
    id: number,
    name: string,
    description: string,
    assistantId: string,
    threadId: string,
    userId: string,
    documentId: string,
    createdDt: string,
    expireDt: string,
    instruction: string,
    model: string
  }
 export interface HistoryI{
    
    id: string,
    status: string,
    assistantId: string,
    userId: string,
    threadId: string,
    question: string,
    answer: string,
    tokenUsed: string,
    uploadedDt: string,
    model:string

}
export interface Assistant {
  id: number,
  name: string,
  description: string,
  assistantId: string,
  threadId: string,
  userId: string,
  documentId: string,
  createdDt: string,
  expireDt: string
}

export interface Document{
    id: number,
    status: string,
    assistantId: string,
    userId: number,
    documentId: string,
    docType: string,
    docSize: string,
    docName: string,
    uploadedDt: string,
    removedDt: string
}