/*
 * @Author: tianyu
 * @Date: 2023-02-13 11:19:07
 * @Description: 
 */
import { redirect } from "react-router-dom";
import { deleteContact } from "../contact";

export async function action({ params }) {
  // throw new Error('oh Dang');
  await deleteContact(params.contactId);
  return redirect("/");
}