import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';

const BLUE = '#1769AA';
const PALE = '#EAF4FC';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [nationalId, setNationalId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [notice, setNotice] = useState('');

  const go = (s) => { setNotice(''); setScreen(s); };
  const Button = ({title, onPress, secondary=false}) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, secondary && styles.secondary]}>
      <Text style={[styles.buttonText, secondary && styles.secondaryText]}>{title}</Text>
    </TouchableOpacity>
  );
  const Header = ({title}) => (
    <View style={styles.header}>
      <Text style={styles.brand}>تحويلتي</Text>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor={BLUE} barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Header title={screen === 'home' ? 'بوابة المريض' : screen === 'register' ? 'تسجيل المريض' : screen === 'track' ? 'متابعة التحويلة' : screen === 'finance' ? 'التغطية المالية' : 'التواصل معنا'} />
        {screen === 'home' && <>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>أهلاً بك في تحويلتي</Text>
            <Text style={styles.heroText}>تابع حالة تحويلتك الطبية واطّلع على الإشعارات بسهولة.</Text>
          </View>
          <Button title="تسجيل مريض جديد" onPress={() => go('register')} />
          <Button title="متابعة التحويلة" onPress={() => go('track')} secondary />
          <Button title="إشعارات التغطية المالية" onPress={() => go('finance')} secondary />
          <Button title="التواصل مع قسم التحويلات" onPress={() => go('contact')} secondary />
          <Text style={styles.disclaimer}>نسخة تجريبية للعرض فقط — لا تُدخل بيانات أو أرقام هويات حقيقية.</Text>
        </>}
        {screen === 'register' && <>
          <Text style={styles.label}>اسم المريض</Text>
          <TextInput value={patientName} onChangeText={setPatientName} placeholder="اكتب الاسم (تجريبي)" style={styles.input} />
          <Text style={styles.label}>رقم الهوية</Text>
          <TextInput value={nationalId} onChangeText={setNationalId} placeholder="رقم تجريبي فقط" keyboardType="numeric" style={styles.input} />
          <View style={styles.info}><Text style={styles.infoText}>في النسخة النهائية ستتم إضافة رفع صورة الهوية. إذا كان المريض طفلاً، تُرفق هوية أحد الوالدين بعد اعتماد المستشفى للإجراء.</Text></View>
          <Button title="حفظ بيانات تجريبية" onPress={() => setNotice('تم حفظ البيانات محلياً لأغراض العرض فقط. لا يوجد اتصال بقاعدة بيانات المستشفى.')} />
          {notice ? <Text style={styles.notice}>{notice}</Text> : null}
          <Button title="رجوع" onPress={() => go('home')} secondary />
        </>}
        {screen === 'track' && <>
          <Text style={styles.sectionTitle}>مسار التحويلة</Text>
          {['استلام طلب التحويلة','مراجعة الطبيب المختص','قسم التحويلات','اعتماد الإدارة','إصدار القرار'].map((x,i) => (
            <View key={x} style={styles.step}><View style={styles.dot}><Text style={styles.dotText}>{i+1}</Text></View><View style={{flex:1}}><Text style={styles.stepTitle}>{x}</Text><Text style={styles.muted}>{i===0 ? 'بانتظار إدخال رقم التحويلة' : 'سيظهر التحديث عند ربط النظام'}</Text></View></View>
          ))}
          <Text style={styles.disclaimer}>الحالات المعروضة توضيحية وليست حالة تحويلة حقيقية.</Text>
          <Button title="رجوع" onPress={() => go('home')} secondary />
        </>}
        {screen === 'finance' && <>
          <View style={styles.info}><Text style={styles.infoText}>ستظهر هنا حالة التغطية المالية للتحويلة، والجهة المسؤولة، وأي إشعار جديد بعد ربط التطبيق بنظام المستشفى.</Text></View>
          <View style={styles.status}><Text style={styles.statusTitle}>حالة التغطية</Text><Text style={styles.statusValue}>غير متاحة في النسخة التجريبية</Text></View>
          <Button title="رجوع" onPress={() => go('home')} secondary />
        </>}
        {screen === 'contact' && <>
          <View style={styles.info}><Text style={styles.infoText}>قناة التواصل الرسمية ورقم الهاتف وساعات العمل ستُضاف بعد اعتمادها من المستشفى.</Text></View>
          <Text style={styles.label}>رسالتك (تجريبية)</Text>
          <TextInput multiline placeholder="اكتب استفسارك هنا" style={[styles.input, {height:110, textAlignVertical:'top'}]} />
          <Button title="إرسال تجريبي" onPress={() => setNotice('هذه نسخة عرض؛ لم يتم إرسال الرسالة إلى المستشفى.')} />
          {notice ? <Text style={styles.notice}>{notice}</Text> : null}
          <Button title="رجوع" onPress={() => go('home')} secondary />
        </>}
        <Text style={styles.footer}>تحويلتي • نموذج أولي غير معتمد للاستخدام الطبي</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#F6FAFD'},
  container:{padding:20,paddingBottom:40},
  header:{backgroundColor:BLUE,borderRadius:18,padding:20,marginBottom:22},
  brand:{color:'#fff',fontSize:27,fontWeight:'bold',textAlign:'center'},
  headerTitle:{color:'#DCEEFF',fontSize:16,textAlign:'center',marginTop:5},
  hero:{backgroundColor:PALE,padding:22,borderRadius:18,marginBottom:18},
  heroTitle:{fontSize:23,fontWeight:'bold',color:'#164B78',textAlign:'right',marginBottom:8},
  heroText:{fontSize:16,color:'#35566F',textAlign:'right',lineHeight:25},
  button:{backgroundColor:BLUE,padding:16,borderRadius:13,alignItems:'center',marginVertical:7},
  buttonText:{color:'#fff',fontSize:16,fontWeight:'bold'},
  secondary:{backgroundColor:'#fff',borderWidth:1,borderColor:'#B7D4EA'},
  secondaryText:{color:BLUE},
  label:{fontSize:16,fontWeight:'bold',color:'#24465F',textAlign:'right',marginTop:12,marginBottom:7},
  input:{backgroundColor:'#fff',borderWidth:1,borderColor:'#C9DCEB',borderRadius:12,padding:14,fontSize:16,textAlign:'right'},
  info:{backgroundColor:PALE,borderRadius:13,padding:15,marginVertical:14},
  infoText:{fontSize:15,color:'#244D6A',textAlign:'right',lineHeight:24},
  notice:{color:'#17633A',backgroundColor:'#E6F6EC',padding:12,borderRadius:10,textAlign:'right',marginVertical:10},
  sectionTitle:{fontSize:20,fontWeight:'bold',textAlign:'right',color:'#24465F',marginBottom:14},
  step:{flexDirection:'row-reverse',alignItems:'center',backgroundColor:'#fff',padding:14,borderRadius:13,marginBottom:10,borderWidth:1,borderColor:'#E0EBF3'},
  dot:{width:34,height:34,borderRadius:17,backgroundColor:BLUE,alignItems:'center',justifyContent:'center',marginLeft:12},
  dotText:{color:'#fff',fontWeight:'bold'},
  stepTitle:{fontSize:16,fontWeight:'bold',textAlign:'right',color:'#24465F'},
  muted:{fontSize:13,color:'#72899A',textAlign:'right',marginTop:4},
  status:{backgroundColor:'#fff',padding:18,borderRadius:14,borderWidth:1,borderColor:'#D8E7F2',marginVertical:12},
  statusTitle:{fontSize:16,fontWeight:'bold',textAlign:'right',color:'#24465F'},
  statusValue:{fontSize:15,textAlign:'right',color:'#A15C12',marginTop:8},
  disclaimer:{fontSize:12,color:'#8A5B26',textAlign:'center',lineHeight:19,marginTop:15,marginBottom:8},
  footer:{fontSize:11,color:'#8A9BA8',textAlign:'center',marginTop:25}
});