import React from 'react'
import { Link, Redirect } from 'react-router-dom';

export const ListBalance = () => {
    return (
       <div>
<li class="relationship">
                <Link to={`/friends/:${id}`}>
                  <img src={imgSrc} alt="Avatar">
                  <div class="name">fewrew</div>
                  <div class="balance i_owe">
                    you owe
                    <span class="amount">$27.50</span>
                  </div>
                  
                    <ul class="balance_details">
                      
                        <li onclick="App.relationshipsRouter.navigate('#/groups/23047512', true); return false">
                          
                          
                          
                          
                          fewrew owes you <span class="positive">$5.00</span> for “Trip”
                        </li>
                      
                        <li onclick="App.relationshipsRouter.navigate('#/groups/23049769', true); return false">
                          
                          
                          
                          
                          You owe fewrew <span class="negative">$32.50</span> for “as”
                        </li>
                      
                    </ul>
                  
                </a>
              </li>

       </div>
    )
}
