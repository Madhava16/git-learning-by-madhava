import { LightningElement } from 'lwc';
import IbirdsLogo from '@salesforce/resourceUrl/iBirdsSmallLogo'
import Zipfile from '@salesforce/resourceUrl/myzipfile';

export default class StaticResource extends LightningElement {
    Logo=Zipfile+'/POINTS.jpg';
    Logo2=Zipfile+'/SHIRT2.jpg';
    Logo3=Zipfile+'/SHIRT3.jpg';
    Logo4=Zipfile+'/SHIRTS.jpg';

}